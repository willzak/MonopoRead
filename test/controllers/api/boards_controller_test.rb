require 'test_helper'

class Api::BoardsControllerTest < ActionDispatch::IntegrationTest
  test "board_tiles index gets all books and recommendations" do
    @user = User.create(name: 'user', email: 'email@email.com', password_digest: 'password')
    @game = Game.create(name: 'game', user: @user)
    @player = Player.create(game: @game, user: @user)
    @board = Board.create(game: @game)
    @board_tile = BoardTile.create(board: @board, tile: Tile.first)
    @player_tile = PlayerTile.create(player: @player, board_tile: @board_tile, book: Book.order('created_at').first)

    get "/api/boards/#{@board[:id]}/board_tiles"
    body = JSON.parse(response.body)

    assert_equal body["board_tiles"][0]["tile"]["name"], 'Number in Title'
    assert_equal body["board_tiles"][0]["books"][0]["name"], '1Q84'
    assert_equal body["board_tiles"][0]["recommendations"][0]["book"]["name"], '1Q84'
  end
end
