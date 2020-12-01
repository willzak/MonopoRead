class Api::BoardsController < ApplicationController
  def index
    boards = Board.all

    render :json => boards
  end

  def show
    board = Board.find(params[:id])

    render :json => board
  end

  def create
    board = Board.new(board_params)
    
    create_board_tiles(board)

    if board.save
      render :json => board
    else
      render :json => {
        error: 'Board was not saved'
      }
    end
  end

  def update
    board = Board.find(params[:id])

    if board.update(board_params)
      render :json => board
    else
      render :json => {
        error: 'Board was not updated'
      }
    end
  end

  def destroy
    board = Board.find(params[:id])
    board.destroy

    render :json => {
      message: 'Board was destroyed'
    }
  end

  def players
    board = Board.find(params[:board_id])
    players = Game.find(board[:game_id]).players.order(:id)
    players = players.map { |player| { player: player, color: Color.find(player[:color_id]), user: User.find(player[:user_id]) } }

    render :json => players
  end

  def users
    board = Board.find(params[:board_id])
    users = Game.find(board[:game_id]).players.all.map { |player| User.find(player[:user_id]) }

    render :json => users
  end

  def player_tiles
    board = Board.find(params[:board_id])
    board_tiles = BoardTile.where(board: board)
    players = Player.where(game_id: board[:game_id])
    player_tiles = players.map { |player| { player: player, player_tiles: PlayerTile.where(player: player, board_tile: board_tiles) } }

    render :json => player_tiles
  end

  def player_chance
    board = Board.find(params[:board_id])
    players = Player.where(game_id: board[:game_id])
    player_cards = players.map { |player| { player: player, player_cards: PlayerCard.where(player: player, board: board) } }

    render :json => player_cards
  end

  def player_stats
    players = get_player_stats(params[:board_id])

    render :json => players
  end

  def winner
    result = Result.where(board_id: params[:board_id], winner: true).first
    player = Player.find(result[:player_id])
    player = { player: player, color: Color.find(player[:color_id]), user: User.find(player[:user_id]) }
    winner = { result: result, player: player }

    render :json => winner
  end

  private
    def board_params
      params.permit(:ended_at, :game_id)
    end
end
