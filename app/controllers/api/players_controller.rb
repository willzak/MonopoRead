class Api::PlayersController < ApplicationController
  def index
    @players = Player.where(game_id: params[:game_id])

    render :json => {
      players: @players
    }
  end

  def show
    @player = Player.find(params[:id])
    @player = { player: @player, color: Color.find(@player[:color_id])}

    render :json => {
      player: @player
    }
  end

  def create
    @player = Player.new(player_params)

    if @player.save
      render :json => {
        player: @player
      }
    else
      render :json => {
        error: 'Player was not saved'
      }
    end
  end

  def update
    @player = Player.find(params[:id])

    if @player.update(player_params)
      render :json => {
        player: @player
      }
    else
      render :json => {
        error: 'Player was not updated'
      }
    end
  end

  def destroy
    @player = Player.find(params[:id])
    @player.destroy

    render :json => {
      message: 'Player was destroyed'
    }
  end

  def current_tile
    @board = Board.find(params[:board_id])
    @board_tiles = BoardTile.where(board: @board)
    @player = Player.find(params[:player_id])
    @current_tile = @player.player_tiles.where(ended_at: nil, board_tile: @board_tiles)
    if @current_tile.empty?
      @current_tile = @player.player_tiles.where(board_tile: @board_tiles).order("ended_at").last
    end

    render :json => {
      current_tile: @current_tile
    }
  end

  def player_tiles
    @board = Board.find(params[:board_id])
    @board_tiles = BoardTile.where(board: @board)
    @player_tiles = PlayerTile.where(player_id: params[:player_id], board_tile: @board_tiles)

    render :json => {
      player_tiles: @player_tiles
    }
  end

  private
    def player_params
      params.permit(:user_id, :game_id, :color_id, :token_id)
    end
end
