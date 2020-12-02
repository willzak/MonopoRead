import { useState, useEffect } from 'react'
import axios from 'axios';
import ActionCable from 'actioncable'
import Cookies from 'universal-cookie';

export default function useApplicationData() {
  const cookies = new Cookies();

  const [users, setUsers] = useState([])
  const [user, setUser] = useState(0)
  const [cable, setCable] = useState(ActionCable.createConsumer(`${process.env.REACT_APP_WEBSOCKET_URL}?token=${cookies.get('user_id')}`))
  const [games, setGames] = useState([])
  const [endedGames, setEndedGames] = useState([])
  const [joinableGames, setJoinableGames] = useState([])
  const [game, setGame] = useState(0)
  const [board, setBoard] = useState(0)
  const [players, setPlayers] = useState([])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [playerStats, setPlayerStats] = useState([])
  const [tiles, setTiles] = useState([])
  const [chance, setChance] =useState(0)
  const [chanceUsed, setChanceUsed] = useState(-1)
  const [showReview, setShowReview] = useState(false)
  const [review, setReview] = useState("")
  const [update, setUpdate] = useState({})
  const [playersInitialized, setPlayersInitialized] = useState(0)
  const [occupied, setOccupied] = useState([])
  const [prevOccupied, setPrevOccupied] = useState([])
  const [currentOccupied, setCurrentOccupied] = useState(0)

  const updateGames = function(game) {
    if (game.user_id === user) {
      setGames((current) => {
        return [ ...current, game ]
      })
    }
    else {
      setJoinableGames((current) => {
        return [ ...current, game ]
      })
    }
  }

  const addPlayer = function(player) {
    setPlayers((current) => {
      return [ ...current, player ]
    })
  }

  const updatePlayerScore = function(player) {
    let index = -1
    for (let i = 0; i < players.length; i++) if (players[i].player.id === player.id) index = i
    if (index === -1) return

    setPlayers((current) => {
      const newPlayers = [...current]
      newPlayers[index] = {...newPlayers[index], player: {...newPlayers[index].player, score: player.score } }
      return newPlayers
    })
  }

  const updatePlayerPosition = function(player) {
    if (player.id === players[currentPlayer].player.id) return
    let index = -1
    for (let i = 0; i < players.length; i++) if (players[i].player.id === player.id) index = i
    if (index === -1) return
      
    setPlayers((current) => {
      const newPlayers = [...current]
      newPlayers[index] = {...newPlayers[index], player: {...newPlayers[index].player, position: player.position } }
      return newPlayers
    })
  }

  const login = function(email, password) {
    axios.post('/login', { email, password })
    .then((response) => {
      cookies.set('user_id', response.data.auth_token, { path: '/' });
      setCable(ActionCable.createConsumer(`${process.env.REACT_APP_WEBSOCKET_URL}?token=${response.data.auth_token}`))
      setUser(response.data.user)
    })
  }

  const logout = function() {
    cookies.set('user_id', '', { path: '/' });
    setGames([])
    setJoinableGames([])
    setGame(0)
    setUser(0)
  }

  const createGame = function(game, player, history) {
    axios.post('/api/create_game', { user_id: user.id, name: game.name, win_requirement: game.win_requirement, win_points: game.win_points, color_id: player.color})
      .then((response) => {
        setGame(response.data.game)
        setBoard(response.data.board.id)
        setPlayers([response.data.player])
        setTiles(response.data.board_tiles.map(tile => {
          return {
            tile: tile,
            id: tile.tile.id,
            board_tile_id: tile.board_tile.id,
            name: tile.tile.name,
            colour: tile.color.hexcode,
            description: tile.tile.description,
            books: tile.books.filter(b => !Array.isArray(b.book)).map(b => {
              return { user: b.player.user.name, color: b.player.color.hexcode, name: b.book.name, review: b.review.review_text } 
            }),
            recommendation: tile.recommendations.map(rec => rec.book.name)
          }
        }))
        setPlayerStats(response.data.player_stats.map(player => {
          return {
            player: player,
            id: player.player.id,
            color: player.color.hexcode,
            name: player.user.name,
            books: player.books,
            points: player.points,
            last_play: player.player.updated_at
          }
        }))
        history.push('/board')
      })
  }

  const joinGame = function(game, player, history) {
    axios.post('/api/join_game', { game_id: game.id, user_id: user.id, color_id: player.color_id })
      .then((response) => {
        setGame(response.data.game)
        setBoard(response.data.board.id)
        setPlayers(response.data.players)
        setTiles(response.data.board_tiles.map(tile => {
          return {
            tile: tile,
            id: tile.tile.id,
            board_tile_id: tile.board_tile.id,
            name: tile.tile.name,
            colour: tile.color.hexcode,
            description: tile.tile.description,
            books: tile.books.filter(b => !Array.isArray(b.book)).map(b => {
              return { user: b.player.user.name, color: b.player.color.hexcode, name: b.book.name, review: b.review.review_text } 
            }),
            recommendation: tile.recommendations.map(rec => rec.book.name)
          }
        }))
        setPlayerStats(response.data.player_stats.map(player => {
          return {
            player: player,
            id: player.player.id,
            color: player.color.hexcode,
            name: player.user.name,
            books: player.books,
            points: player.points,
            last_play: player.player.updated_at
          }
        }))
        history.push('/board')
      })
  }

  const playGame = function(game, history) {
    axios.post('/api/play_game', { user_id: user.id, game_id: game.id })
    .then((response) => {
      setGame(response.data.game)
      setBoard(response.data.board.id)
      setPlayers(response.data.players)
      setTiles(response.data.board_tiles.map(tile => {
        return {
          tile: tile,
          id: tile.tile.id,
          board_tile_id: tile.board_tile.id,
          name: tile.tile.name,
          colour: tile.color.hexcode,
          description: tile.tile.description,
          books: tile.books.filter(b => !Array.isArray(b.book)).map(b => {
            return { user: b.player.user.name, color: b.player.color.hexcode, name: b.book.name, review: b.review.review_text } 
          }),
          recommendation: tile.recommendations.map(rec => rec.book.name)
        }
      }))
      setPlayerStats(response.data.player_stats.map(player => {
        return {
          player: player,
          id: player.player.id,
          color: player.color.hexcode,
          name: player.user.name,
          books: player.books,
          points: player.points,
          last_play: player.player.updated_at
        }
      }))
      history.push('/board')
    })
  }

  const getTiles = function(board) {
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
            return { user: b.player.user.name, color: b.player.color.hexcode, name: b.book.name, review: b.review.review_text } 
          }),
          recommendation: tile.recommendations.map(rec => rec.book.name)
        }
      }));
    })
    axios.get(`/api/boards/${board}/player_stats`)
      .then((response) => {
        setPlayerStats(response.data.players.map(player => {
          return {
            player: player,
            id: player.player.id,
            color: player.color.hexcode,
            name: player.user.name,
            books: player.books,
            points: player.points,
            last_play: player.player.updated_at
          }
        }))
      })
  }

  const endGame = function(endedGame) {
    if (game && !game.ended_at) {
      setGame(current => {
        return {...current, ended_at : new Date() }
      })
    }
    else {
      let index = -1
      games.forEach((game, i) => {
        if (game.id === endedGame.id) index = i
      })
      if (index !== -1) {
        const newGames = [...games]
        newGames.splice(index, 1)
        setGames(newGames)
        setEndedGames([...endedGames, endedGame])
      }
      else {
        joinableGames.forEach((game, i) => {
          if (game.id === endedGame.id) index = i
        })
        if (index !== -1) {
          const newGames = [...joinableGames]
          newGames.splice(index, 1)
          setJoinableGames(newGames)
        }
      }
    }
  }

  const fullGame = function(fullGame) {
    let index = -1
    joinableGames.forEach((game, i) => {
      if (game.id === fullGame.id) index = i
    })
    if (index !== -1) {
      const newGames = [...joinableGames]
      newGames.splice(index, 1)
      setJoinableGames(newGames)
    }
  }

  const endBoard = function(winner, playerStats) {
    const now = new Date()
    axios.put(`/api/boards/${board}`, { ended_at: now })
      .then(() => {
        return axios.post(`/api/boards/${board}/results`, { winner, playerStats })
      })
      .then(() => {
        setGame(current => {
          return {...current, ended_at : now }
        })
        axios.put(`/api/games/${game.id}`, { ended_at: now })
      })
  }

  const rollDice = function(number, player) {
    let ran = 0;
    axios.put(`/api/games/${game.id}/players/${players[player].player.id}`, { final_position: ((players[player].player.position + number) % 24), moving: true })

    const interval = setInterval(() => {
      ran++;
      
      setPlayers((current) => {
        const done = (ran === number)
        const newPlayers = [...current]
        newPlayers[player] = {...newPlayers[player], player: {...newPlayers[player].player, position: ((newPlayers[player].player.position + 1) % 24), moving: !done, done: done } }
        axios.put(`/api/games/${game.id}/players/${newPlayers[player].player.id}`, { position: newPlayers[player].player.position, moving: !done })
        return newPlayers
      })

      

      if (ran === number) {
          window.clearInterval(interval);
      }
    }, 300);
  }

  const passGo = function(player) {
    axios.put(`/api/games/${game.id}/players/${players[player].player.id}`, { score: players[player].player.score + 1 })
      
    setPlayers((current) => {
      const newPlayers = [...current]
      newPlayers[player] = {...newPlayers[player], player: {...newPlayers[player].player, done: false } }
      return newPlayers
    })
  }

  const landTile = function(player, tile) {
    axios.post(`/api/games/${game.id}/players/${players[player].player.id}/player_tiles`, { board_tile_id: tile.board_tile_id })
    .then(() => {
      setPlayers((current) => {
        const newPlayers = [...current]
        newPlayers[player] = {...newPlayers[player], player: {...newPlayers[player].player, done: false, tiles: newPlayers[player].player.tiles ? newPlayers[player].player.tiles + 1 : 1 } }
        return newPlayers
      })
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
      getTiles(board);
    })
  }

  const transport = function(player) {
    setPlayers((current) => {
      const newPlayers = [...current]
      newPlayers[player] = {...newPlayers[player], player: {...newPlayers[player].player, position: (newPlayers[player].player.position + 12) % 24 } }
      return newPlayers
    })
  }

  useEffect(() => {
    axios.get(`/api/users`)
    .then((response) => {
      setUsers(response.data)
    })
    if (cookies.get('user_id')) {
      axios.get(`/logged_in`, { headers: { Authorization: `${cookies.get('user_id')}` } })
      .then((response) => {
        setUser(response.data)
      })
      .catch(() => { setUser(0) })
    }
  }, []);

  useEffect(() => {
    if (!user) return
    let channel
    if (game !== 0) {
      channel = cable.subscriptions.create(
        { channel: "ApplicationCable::GameChannel", game_id: game.id },
        { received: (data) => setUpdate(data) })
    }
    else {
      channel = cable.subscriptions.create(
        { channel: "ApplicationCable::Channel" },
        { received: (data) => setUpdate(data) })
      setBoard(0)
      setPlayers([])
      setTiles([])
    }
    return () => channel.unsubscribe()
  }, [game, user])

  useEffect(() => {
    if (players.length > 0) for (let i = 0; i < players.length; i++) if (players[i].player.user_id === user.id) setCurrentPlayer(i)
  }, [players.length, user])

  useEffect(() => {
    if (playersInitialized !== 0) {
      players.forEach((player, index) => {
        if (player.player.moving) rollDice(Math.abs(player.player.final_position - player.player.position), index)
      })
      setPlayersInitialized(0)
    }
  }, [playersInitialized])

  useEffect(() => {
    if (update.message === 'Game created') updateGames(update.game)
    if (update.message === 'Game ended') endGame(update.game)
    if (update.message === 'Player joined') addPlayer(update.player)
    if (update.message === 'Player joined - game full') fullGame(update.game)
    if (update.message === 'Player moved') updatePlayerPosition(update.player)
    if (update.message === 'Player passed go') updatePlayerScore(update.player)
    if (update.message === 'Book submitted') getTiles(board)
  }, [update])

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
    let tileIds = [];
    for (let user of players) {
      tileIds.push(user.player.position);
    }

    setPrevOccupied([...occupied])
    setOccupied(tileIds);
  }, [players])

  useEffect(() => {
    for (let i = 0; i <= occupied.length; i++) {
      if (occupied[i] !== prevOccupied[i]) {
        setCurrentOccupied(occupied[i]);
      }
    }
  }, [occupied, prevOccupied])

  return {
    cookies, users, setUsers,
    user, setUser,
    games, setGames,
    endedGames, setEndedGames,
    joinableGames, setJoinableGames,
    game, setGame,
    board, setBoard,
    players, setPlayers,
    currentPlayer, setCurrentPlayer,
    playerStats, setPlayerStats,
    tiles, setTiles,
    chance, setChance,
    chanceUsed, setChanceUsed,
    showReview, setShowReview,
    review, setReview,
    currentOccupied, setCurrentOccupied,
    createGame, joinGame, playGame,
    login, logout, endBoard,
    rollDice, passGo, landTile, saveBook, transport
  }
}