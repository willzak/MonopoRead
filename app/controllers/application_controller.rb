class ApplicationController < ActionController::API
  include ActionController::Helpers

  def current_tile_for_player(board_id, player_id)
    @board = Board.find(board_id)
    @board_tiles = BoardTile.where(board: @board)
    @player = Player.find(player_id)
    @current_tile = @player.player_tiles.where(ended_at: nil, board_tile: @board_tiles).first
    if !@current_tile
      @current_tile = @player.player_tiles.where(board_tile: @board_tiles).order("ended_at").last
    end
    
    return @current_tile
  end

  def http_token
      @http_token ||= if request.headers['Authorization'].present?
        request.headers['Authorization']
      end
  end

  def auth_token
    @auth_token ||= JsonWebToken.decode(http_token)
  end

  def user_id_in_token?
    http_token && auth_token && auth_token[:user_id].to_i
  end
end
