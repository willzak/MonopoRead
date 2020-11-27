import { useState, useEffect } from 'react'
import axios from 'axios';
import ActionCable from 'actioncable'

export default function useApplicationData() {
  const [game, setGame] = useState(0)
  const [board, setBoard] = useState(0)
  const [players, setPlayers] = useState([])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [tiles, setTiles] = useState([])
  const [chance, setChance] =useState(0)
  const [chanceUsed, setChanceUsed] = useState(-1)
  const [showReview, setShowReview] = useState(false)
  const [review, setReview] = useState("")
  const [update, setUpdate] = useState({})

  useEffect(() => {
    const cable = ActionCable.createConsumer(process.env.REACT_APP_WEBSOCKET_URL);
    cable.subscriptions.create("ApplicationCable::Channel", {
      received: function (received_data) {
        setUpdate(received_data)
      }
    })
  }, []);

  useEffect(() => {
    if (update.message === 'Player moved' && update.player.game_id === game && update.player.position !== players[currentPlayer].player.position) updatePlayerPosition(update)
    if (update.message === 'Player passed go') updatePlayerScore(update)
    if (update.message === 'Book submitted') getTiles()
  }, [update])

  const updatePlayerScore = function(update) {
    let player = -1
    for (let i = 0; i < players.length; i++) if (players[i].player.id === update.player.id) player = i

    if (player === -1) return

    setPlayers((current) => {
      const newPlayers = [...current]
      newPlayers[player] = {...newPlayers[player], player: {...newPlayers[player].player, score: update.player.score } }
      return newPlayers
    })
  }

  const updatePlayerPosition = function(update) {
    let player = -1
    for (let i = 0; i < players.length; i++) if (players[i].player.id === update.player.id) player = i

    if (player === -1) return
    let ran = players[player].player.position;

    const interval = setInterval(() => {
      ran++;
      
      setPlayers((current) => {
        const newPlayers = [...current]
        newPlayers[player] = {...newPlayers[player], player: {...newPlayers[player].player, position: ((newPlayers[player].player.position + 1) % 24) } }
        return newPlayers
      })

      if (ran === update.player.position) {
          window.clearInterval(interval);
      }
    }, 300);
  }

  const drawChance = function(player) {
    setChanceUsed(player)
  }

  const landTile = function(player, tile) {
    axios.post(`/api/games/${game}/players/${players[player].player.id}/player_tiles`, { board_tile_id: tile.board_tile_id })
    .then(() => {
      setPlayers((current) => {
        const newPlayers = [...current]
        newPlayers[player] = {...newPlayers[player], player: {...newPlayers[player].player, done: false, tiles: newPlayers[player].player.tiles ? newPlayers[player].player.tiles + 1 : 1 } }
        return newPlayers
      })
    })
  }

  const getTiles = function() {
    axios.get(`/api/boards/${board}/board_tiles`)
    .then((response) => {
      setTiles(response.data.map(tile => {
        return {
          tile: tile,
          id: tile.tile.id,
          board_tile_id: tile.board_tile.id,
          name: tile.tile.name,
          colour: tile.color.hexcode,
          description: tile.tile.description,
          books: tile.books.filter(b => !Array.isArray(b.book)).map(b => {
            return { name: b.book.name, review: b.review.review_text } 
          }),
          recommendation: tile.recommendations.map(rec => rec.book.name)
        }
      }));
    })
  }

  const saveBook = function(player, title, review, board_tile_id) {
    return axios.post(`/api/boards/${board}/players/${players[player].player.id}/submit`, {title, review, board_tile_id})
    .then (() => {
      setPlayers((current) => {
        const newPlayers = [...current]
        newPlayers[player] = {...newPlayers[player], player: {...newPlayers[player].player, done: false, tiles: newPlayers[player].player.tiles - 1 } }
        return newPlayers
      })
      getTiles();
    })
  }

  const passGo = function(player) {
    axios.put(`/api/games/${game}/players/${players[player].player.id}`, { score: players[player].player.score + 1 })
      
    setPlayers((current) => {
      const newPlayers = [...current]
      newPlayers[player] = {...newPlayers[player], player: {...newPlayers[player].player, done: false } }
      return newPlayers
    })
  }

  const rollDice = function(number, player) {
    let ran = 0;

    const interval = setInterval(() => {
      ran++;
      
      setPlayers((current) => {
        const done = (ran === number)
        const newPlayers = [...current]
        newPlayers[player] = {...newPlayers[player], player: {...newPlayers[player].player, position: ((newPlayers[player].player.position + 1) % 24), moving: !done, done: done } }
        if (ran === number) axios.put(`/api/games/${game}/players/${newPlayers[player].player.id}`, { position: newPlayers[player].player.position })
        return newPlayers
      })

      if (ran === number) {
          window.clearInterval(interval);
      }
    }, 300);
  }

  useEffect(() => {
    axios.get(`/api/games`)
    .then((response) => {
      setGame(response.data[0].id)
    })
  }, [])

  useEffect(() => {
    if (players.length > 0 && chanceUsed !== -1) {
      axios.get(`/api/boards/${board}/players/${players[chanceUsed].player.id}/draw_chance`)
      .then((response) => {
        setPlayers((current) => {
          const newPlayers = [...current]
          newPlayers[chanceUsed] = {...newPlayers[chanceUsed], player: {...newPlayers[chanceUsed].player, chance: newPlayers[chanceUsed].player.chance ? newPlayers[chanceUsed].player.chance - 1 : 1 } }
          return newPlayers
        })
        setChance(response.data)
        setChanceUsed(-1)
      
      })
    }
  }, [chanceUsed])

  useEffect(() => {
    if (game !== 0) {
      axios.get(`/api/games/${game}`)
      .then(() => {
        return axios.get(`/api/games/${game}/current_board`)
      })
      .then((response) => {
        if (!response.data) return axios.post(`/api/boards`, {game_id: game})
        return response
      })
      .then((response) => {
        if (!response.data) return
        setBoard(response.data.id);
      })
    }
  }, [game])

  useEffect(() => {
    if (board !== 0) {
      axios.get(`/api/boards/${board}/players`)
      .then((response) => {
        setPlayers(response.data);
      })
    }
  }, [board])

  useEffect(() => {
    if (board !== 0) getTiles()
  }, [board])

  return {
    game, setGame,
    board, setBoard,
    players, setPlayers,
    currentPlayer, setCurrentPlayer,
    tiles, setTiles,
    chance, setChance,
    chanceUsed, setChanceUsed,
    showReview, setShowReview,
    review, setReview,
    drawChance, landTile, saveBook, rollDice, passGo
  }
}