class Api::TilesController < ApplicationController
  def index
    @tiles = Tile.all

    render :json => {
      tiles: @tiles
    }
  end

  def show
    @tile = Tile.find(params[:id])

    render :json => {
      tile: @tile
    }
  end

  def create
    @tile = Tile.new(tile_params)

    if @tile.save
      render :json => {
        tile: @tile
      }
    else
      render :json => {
        error: 'Tile was not saved'
      }
    end
  end

  def update
    @tile = Tile.find(params[:id])

    if @tile.update(tile_params)
      render :json => {
        tile: @tile
      }
    else
      render :json => {
        error: 'Tile was not updated'
      }
    end
  end

  def destroy
    @tile = Tile.find(params[:id])
    @tile.destroy

    render :json => {
      message: 'Tile was destroyed'
    }
  end

  private
    def tile_params
      params.require(:tile).permit(:name, :description, :tile_group_id)
    end
end
