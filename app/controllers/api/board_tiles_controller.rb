class Api::BoardTilesController < ApplicationController
  def index
    @board_tiles = BoardTile.where(board_id: params[:board_id])
    @board_tiles = @board_tiles.map { |board_tile| {
      board_tile: board_tile,
      tile: Tile.find(board_tile[:tile_id]),
      color: Color.find(TileGroup.find(Tile.find(board_tile[:tile_id])[:tile_group_id])[:color_id]),
      books: board_tile.player_tiles.all.map { |player_tile| player_tile[:book_id] == nil ? [] : Book.find(player_tile[:book_id]) },
      recommendations: Tile.find(board_tile[:tile_id]).recommendations.all.map { |recommendation| { recommendation: recommendation, book: Book.find(recommendation[:book_id]) } }
    } }

    render :json => @board_tiles
  end

  def show
    @board_tile = BoardTile.find(params[:id])

    render :json => @board_tile
  end

  def create
    @board_tile = BoardTile.new(board_tile_params)

    if @board_tile.save
      render :json => @board_tile
    else
      render :json => {
        error: 'Board Tile was not saved'
      }
    end
  end

  def update
    @board_tile = BoardTile.find(params[:id])

    if @board_tile.update(board_tile_params)
      render :json => @board_tile
    else
      render :json => {
        error: 'Board Tile was not updated'
      }
    end
  end

  def destroy
    @board_tile = BoardTile.find(params[:id])
    @board_tile.destroy

    render :json => {
      message: 'Board Tile was destroyed'
    }
  end

  private
    def board_tile_params
      params.permit(:board_id, :tile_id)
    end
end
