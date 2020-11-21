class Api::TileGroupsController < ApplicationController
  def index
    @tile_groups = TileGroup.all

    render :json => {
      tile_groups: @tile_groups
    }
  end

  def show
    @tile_group = TileGroup.find(params[:id])

    render :json => {
      tile_group: @tile_group
    }
  end

  def create
    @tile_group = TileGroup.new(tile_group_params)

    if @tile_group.save
      render :json => {
        tile_group: @tile_group
      }
    else
      render :json => {
        error: 'Tile Group was not saved'
      }
    end
  end

  def update
    @tile_group = TileGroup.find(params[:id])

    if @tile_group.update(tile_group_params)
      render :json => {
        tile_group: @tile_group
      }
    else
      render :json => {
        error: 'Tile Group was not updated'
      }
    end
  end

  def destroy
    @tile_group = TileGroup.find(params[:id])
    @tile_group.destroy

    render :json => {
      message: 'Tile Group was destroyed'
    }
  end

  private
    def tile_group_params
      params.require(:tile_group).permit(:name, :description, :color_id)
    end
end
