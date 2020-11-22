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
    @player = Player.find(params[:id])
    @current_tile = @player.player_tiles.where(ended_at: nil)
    if !@current_tile
      @current_tile = @player.player_tiles.order("ended_at").last
    end

    render :json => {
      current_tile: @current_tile
    }
  end

  def player_tiles
    @player_tiles = PlayerTiles.where(player_id: params[:player_id], board_id: params[:board_id])

    render :json => {
      player_tiles: @player_tiles
    }
  end

  private
    def player_params
      params.permit(:user_id, :game_id, :color_id, :token_id)
    end
end
