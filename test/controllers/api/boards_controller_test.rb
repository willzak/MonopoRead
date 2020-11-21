require 'test_helper'

class Api::BoardsControllerTest < ActionDispatch::IntegrationTest
  test "board_tiles index gets all books and recommendations" do
    Rails.application.load_seed
    @user = User.create(name: 'user', email: 'email@email.com', password_digest: 'password')
    @game = Game.create(user: @user)
    @player = Player.create(game: @game, user: @user)
    @board = Board.create(game: @game)
    @board_tile = BoardTile.create(board: @board, tile: Tile.where.not(name: nil).first)
    @player_tile = PlayerTile.create(player: @player, board_tile: @board_tile, book: Book.where.not(name: nil).first)
    
    get "/api/boards/#{@board[:id]}/board_tiles"
    body = JSON.parse(response.body)
    puts body.inspect
  end
end
