class Api::PlayerTileTilesController < ApplicationController
  def index
    render :json => {
      error: "Player Tiles only accessible through '/boards/:board_id/player_tiles' (player tiles for specific board) or '/boards/:board_id/players/:player_id/player_tiles' (player tiles for specific player on specific board)"
    }
  end

  def show
    @player_tile = PlayerTile.find(params[:id])

    render :json => {
      player_tile: @player_tile
    }
  end

  def create
    @player_tile = PlayerTileTile.new(player_tile_params)

    if @player_tile.save
      render :json => {
        player_tile: @player_tile
      }
    else
      render :json => {
        error: 'Player Tile was not saved'
      }
    end
  end

  def update
    @player_tile = PlayerTileTile.find(params[:player_tile_id])

    if @player_tile.update(player_tile_params)
      render :json => {
        player_tile: @player_tile
      }
    else
      render :json => {
        error: 'Player Tile was not updated'
      }
    end
  end

  def destroy
    @player_tile = PlayerTile.find(params[:id])
    @player_tile.destroy

    render :json => {
      message: 'Player Tile was destroyed'
    }
  end

  private
    def player_tile_params
      params.permit(:ended_at, :player_tile_id, :board_tile_id, :book_id, :review_id)
    end
end