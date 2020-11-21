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

  def player_tiles
    @board = Board.find(params[:id])
    @game = Game.find(@board[:game_id])
    @players = Player.where(game: @game)
    @player_tiles = @players.map { |player| { player: player, player_tiles: PlayerTiles.where(player: player, board: @board) } }

    render :json => {
      player_tiles: @player_tiles
    }
  end

  private
    def board_params
      params.require(:board).permit(:win_requirement, :win_points, :isbn_trust, :isbn_master, :isbn_vote, :turn_delay, :turn_reminder, :ended_at, :game_id)
    end
end
