class Api::PlayersController < ApplicationController
  def index
    @players = Player.where(game_id: params[:game_id])

    render :json => {
      players: @players
    }
  end

  def show
    @player = Player.find(params[:id])

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

  def player_tiles
    @player_tiles = PlayerTiles.where(player_id: params[:player_id], board_id: params[:board_id])

    render :json => {
      player_tiles: @player_tiles
    }
  end

  private
    def player_params
      params.require(:player).permit(:user_id, :game_id, :color_id, :token_id)
    end
end
