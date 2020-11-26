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

  useEffect(() => {
    const cable = ActionCable.createConsumer(process.env.REACT_APP_WEBSOCKET_URL);
    const subscription = cable.subscriptions.create("ApplicationCable::Channel", {
      connected: function() {
        console.log("You've subscribed to the channel");
      },
      disconnected: function() {
        console.log("You've disconnected from the channel");
      },
      received: function (received_data) {
        console.log('Message from channel:', received_data);
      }
    })
  }, []);

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

  const saveBook = function(player, title, review, board_tile_id) {
    axios.post(`/api/boards/${board}/players/${players[player].player.id}/submit`, {title, review, board_tile_id})
    .then ((response) => {
      console.log(response)
      setPlayers((current) => {
        const newPlayers = [...current]
        newPlayers[player] = {...newPlayers[player], player: {...newPlayers[player].player, done: false, tiles: newPlayers[player].player.tiles - 1 } }
        return newPlayers
      })
      return axios.get(`/api/boards/${board}/board_tiles`)
    })
    .then((response) => {
      setTiles(response.data.map(tile => {
        return {
          tile: tile,
          id: tile.tile.id,
          board_tile_id: tile.board_tile.id,
          name: tile.tile.name,
          colour: tile.color.hexcode,
          description: tile.tile.description,
          books: tile.books.map(b => {
            return { name: b.book.name, review: b.review.review_text } 
          }),
          recommendation: tile.recommendations.map(rec => rec.book.name)
        }
      }));
    })
  }

  const rollDice = function(number, player) {
    let ran = 0;

    const interval = setInterval(() => {
      ran++;
      
      setPlayers((current) => {
        const newPlayers = [...current]
        newPlayers[player] = {...newPlayers[player], player: {...newPlayers[player].player, position: ((newPlayers[player].player.position + 1) % 24), done: (ran === number) ? true : false } }
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
    if (board !== 0) {
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
            books: tile.books.map(b => {
              return { name: b.book.name, review: b.review.review_text } 
            }),
            recommendation: tile.recommendations.map(rec => rec.book.name)
          }
        }));
      })
    }
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
    drawChance, landTile, saveBook, rollDice, 
  }
}