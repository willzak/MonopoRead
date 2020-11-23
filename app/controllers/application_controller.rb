class ApplicationController < ActionController::API
  def current_tile_for_player(board_id, player_id)
    @board = Board.find(board_id)
    @board_tiles = BoardTile.where(board: @board)
    @player = Player.find(player_id)
    @current_tile = @player.player_tiles.where(ended_at: nil, board_tile: @board_tiles)
    if @current_tile.empty?
      @current_tile = @player.player_tiles.where(board_tile: @board_tiles).order("ended_at").last
    end

    return @current_tile
  end
  helper_method :current_tile_for_player
end
