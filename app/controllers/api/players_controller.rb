class Api::PlayersController < ApplicationController
  def index
    @players = Player.where(game_id: params[:game_id])
    @players = @players.map { |player| { player: player, color: Color.find(player[:color_id]), user: User.find(player[:user_id]) } }

    render :json => @players
  end

  def show
    @player = Player.find(params[:id])
    @player = { player: @player, color: Color.find(@player[:color_id]), user: User.find(player[:user_id]) }

    render :json => @player
  end

  def create
    @player = Player.new(player_params)

    if @player.save
      render :json => @player
    else
      render :json => {
        error: 'Player was not saved'
      }
    end
  end

  def update
    @player = Player.find(params[:id])

    if @player.update(player_params)
      render :json => @player
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

  def current_tile
    @current_tile = current_tile_for_player(params[:board_id], params[:player_id])

    render :json => @current_tile
  end

  def player_tiles
    @board = Board.find(params[:board_id])
    @board_tiles = BoardTile.where(board: @board)
    @player_tiles = PlayerTile.where(player_id: params[:player_id], board_tile: @board_tiles)

    render :json => @player_tiles
  end

  def player_chance
    @board = Board.find(params[:board_id])
    @player_cards = PlayerCard.where(player_id: params[:player_id], board: @board)

    render :json => @player_cards
  end

  def draw_chance
    @board = Board.find(params[:board_id])
    @player = Player.find(params[:player_id])
    @card = Card.order(Arel.sql('random()')).first
    @player_card = PlayerCard.new(player: @player, board: @board, card: @card)

    if @player_card.save
      render :json => @player_card
    else
      render :json => {
        error: 'Player Card was not saved'
      }
    end
  end

  private
    def player_params
      params.permit(:user_id, :game_id, :color_id, :token_id)
    end
end
