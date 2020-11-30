class Api::GamesController < ApplicationController
  def index
    games = Game.all

    render :json => games
  end

  def show
    game = Game.find(params[:id])

    render :json => game
  end

  def create
    game = Game.new(game_params)

    if game.save
      ActionCable.server.broadcast("channel", { message: 'Game created', game: game})
      render :json => game
    else
      render :json => {
        error: 'Game was not saved'
      }
    end
  end

  def update
    game = Game.find(params[:id])

    if game.update(game_params)
      if params[:ended_at]
        ActionCable.server.broadcast("game#{game[:id]}_channel", { message: 'Game ended', game: game})
        ActionCable.server.broadcast("channel", { message: 'Game ended', game: game})
      end
      render :json => game
    else
      render :json => {
        error: 'Game was not updated'
      }
    end
  end

  def destroy
    game = Game.find(params[:id])
    game.destroy

    render :json => {
      message: 'Game was destroyed'
    }
  end

  def players
    players = Game.find(params[:game_id]).players.all
    players = players.map { |player| { player: player, color: Color.find(player[:color_id]), user: User.find(player[:user_id]) } }

    render :json => players
  end

  def users
    users = Game.find(params[:game_id]).players.all.map { |player| User.find(player[:user_id]) }

    render :json => users
  end

  def free_colors
    used_colors = Game.find(params[:game_id]).players.all.pluck(:color_id)
    colors = Color.all.select { |color| !used_colors.include?(color[:id])}

    render :json => colors
  end

  def boards
    boards = Board.where(game_id: params[:game_id])

    render :json => boards
  end

  def current_board
    current_board = Board.where(game_id: params[:game_id], ended_at: nil).first
    if !current_board
      current_board = Board.where(game_id: params[:game_id]).order("ended_at").last
    end

    render :json => current_board
  end

  def colors
    colors = Color.order(:id)

    render :json => colors
  end

  def create_game
    game = Game.new(game_params)

    if game.save
      ActionCable.server.broadcast("channel", { message: 'Game created', game: game})
      player = Player.new(user_id: params[:user_id], game_id: game[:id], color_id: params[:color_id], position: 0, score: 0, moving: false, final_position: 0)
      
      if player.save
        player = { player: player, color: Color.find(player[:color_id]), user: User.find(player[:user_id]) }
        board = Board.new(game_id: game[:id])
        if board.save
          board_tiles = create_board_tiles(board)
          player_stats = get_player_stats(board[:id])
          render :json => {
            game: game,
            player: player,
            board: board,
            board_tiles: board_tiles,
            player_stats: player_stats
          }
        else
          render :json => {
            error: 'Board was not saved'
          }
        end
      else
        render :json => {
          error: 'Player was not saved'
        }
      end
    else
      render :json => {
        error: 'Game was not saved'
      }
    end
  end

  def join_game
    player = Player.new(user_id: params[:user_id], game_id: params[:game_id], color_id: params[:color_id], position: 0, score: 0, moving: false, final_position: 0)
    if player.save
      player_info = { player: player, color: Color.find(player[:color_id]), user: User.find(player[:user_id]) }
      game = Game.find(params[:game_id])
      players = Player.where(game: game)
      players = players.map { |player| { player: player, color: Color.find(player[:color_id]), user: User.find(player[:user_id]) } }
      board = Board.where(game_id: params[:game_id], ended_at: nil).first
      if !board
        board = Board.where(game_id: params[:game_id]).order("ended_at").last
      end
      board_tiles = get_board_tiles(board)
      player_stats = get_player_stats(board[:id])
      ActionCable.server.broadcast("game#{player[:game_id]}_channel", { message: 'Player joined', player: player_info})
      render :json => {
        game: game,
        players: players,
        board: board,
        board_tiles: board_tiles,
        player_stats: player_stats
      }
    else
      render :json => {
        error: 'Player was not saved'
      }
    end
  end

  def play_game
    player = Player.where(user_id: params[:user_id], game_id: params[:game_id]).first
    player_info = { player: player, color: Color.find(player[:color_id]), user: User.find(player[:user_id]) }
    game = Game.find(params[:game_id])
    players = Player.where(game: game)
    players = players.map { |player| { player: player, color: Color.find(player[:color_id]), user: User.find(player[:user_id]) } }
    board = Board.where(game_id: params[:game_id], ended_at: nil).first
    if !board
      board = Board.where(game_id: params[:game_id]).order("ended_at").last
    end
    board_tiles = get_board_tiles(board)
    player_stats = get_player_stats(board[:id])

    render :json => {
      game: game,
      players: players,
      board: board,
      board_tiles: board_tiles,
      player_stats: player_stats
    }
  end

  private
    def game_params
      params.permit(:name, :password_digest, :max_players, :win_requirement, :win_points, :isbn_trust, :isbn_master, :isbn_vote, :turn_delay, :turn_reminder, :ended_at, :user_id)
    end
end
