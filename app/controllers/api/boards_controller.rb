class Api::BoardsController < ApplicationController
  def index
    @boards = Board.all

    render :json => @boards
  end

  def show
    @board = Board.find(params[:id])

    render :json => @board
  end

  def create
    @board = Board.new(board_params)

    if @board.save
      render :json => @board
    else
      render :json => {
        error: 'Board was not saved'
      }
    end
  end

  def update
    @board = Board.find(params[:id])

    if @board.update(board_params)
      render :json => @board
    else
      render :json => {
        error: 'Board was not updated'
      }
    end
  end

  def destroy
    @board = Board.find(params[:id])
    @board.destroy

    render :json => {
      message: 'Board was destroyed'
    }
  end

  def players
    @board = Board.find(params[:board_id])
    @players = Game.find(@board[:game_id]).players.all
    @players = @players.map { |player| { player: player, color: Color.find(player[:color_id]) } }

    render :json => @players
  end

  def users
    @board = Board.find(params[:board_id])
    @users = Game.find(@board[:game_id]).players.all.map { |player| User.find(player[:user_id]) }

    render :json => @users
  end

  def player_tiles
    @board = Board.find(params[:board_id])
    @board_tiles = BoardTile.where(board: @board)
    @game = Game.find(@board[:game_id])
    @players = Player.where(game: @game)
    @player_tiles = @players.map { |player| { player: player, player_tiles: PlayerTile.where(player: player, board_tile: @board_tiles) } }

    render :json => @player_tiles
  end

  def current_tiles
    @board = Board.find(params[:board_id])
    @game = Game.find(@board[:game_id])
    @current_tiles = Player.where(game: @game).map { |player| { player: player, current_tile: current_tile_for_player(params[:board_id], player[:id]) } }

    render :json => @current_tiles
  end

  def player_stats
    @board = Board.find(params[:board_id])
    @board_tiles = BoardTile.where(board: @board)
    @game = Game.find(@board[:game_id])
    @players = Player.where(game: @game).map { |player| {
      player: player,
      color: Color.find(player[:color_id]),
      books: PlayerTile.where.not(ended_at: nil).where(player: player, board_tile: @board_tiles).length,
      last_play: current_tile_for_player(params[:board_id], player[:id])[:ended_at] || current_tile_for_player(params[:board_id], player[:id])[:created_at]
    } }

    render :json => @players
  end

  private
    def board_params
      params.permit(:win_requirement, :win_points, :isbn_trust, :isbn_master, :isbn_vote, :turn_delay, :turn_reminder, :ended_at, :game_id)
    end
end
