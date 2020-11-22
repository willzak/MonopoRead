class Api::BoardsController < ApplicationController
  def index
    @boards = Board.all

    render :json => {
      boards: @boards
    }
  end

  def show
    @board = Board.find(params[:id])

    render :json => {
      board: @board
    }
  end

  def create
    @board = Board.new(board_params)

    if @board.save
      render :json => {
        board: @board
      }
    else
      render :json => {
        error: 'Board was not saved'
      }
    end
  end

  def update
    @board = Board.find(params[:id])

    if @board.update(board_params)
      render :json => {
        board: @board
      }
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

    render :json => {
      players: @players
    }
  end

  def users
    @board = Board.find(params[:board_id])
    @users = Game.find(@board[:game_id]).players.all.map { |player| User.find(player[:user_id]) }

    render :json => {
      users: @users
    }
  end

  def player_tiles
    @board = Board.find(params[:board_id])
    @board_tiles = BoardTile.where(board: @board)
    @game = Game.find(@board[:game_id])
    @players = Player.where(game: @game)
    @player_tiles = @players.map { |player| { player: player, player_tiles: PlayerTile.where(player: player, board_tile: @board_tiles) } }

    render :json => {
      player_tiles: @player_tiles
    }
  end

  private
    def board_params
      params.permit(:win_requirement, :win_points, :isbn_trust, :isbn_master, :isbn_vote, :turn_delay, :turn_reminder, :ended_at, :game_id)
    end
end
