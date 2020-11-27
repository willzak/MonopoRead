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
      if !params[:score]
        ActionCable.server.broadcast('channel', { message: 'Player moved', player: @player})
      else
        ActionCable.server.broadcast('channel', { message: 'Player passed go', player: @player})
      end
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

  def player_tiles
    @board_tiles = BoardTile.where(board_id: params[:board_id])
    @player_tiles = PlayerTile.where(player_id: params[:player_id], board_tile: @board_tiles)

    render :json => @player_tiles
  end

  def player_chance
    @player_cards = PlayerCard.where(player_id: params[:player_id], board_id: params[:board_id])

    render :json => @player_cards
  end

  def draw_chance
    @card = Card.order(Arel.sql('random()')).first
    @player_card = PlayerCard.new(player_id: params[:player_id], board_id: params[:board_id], card: @card)

    if @player_card.save
      render :json => {
        player_card: @player_card,
        card: @card
      }
    else
      render :json => {
        error: 'Player Card was not saved'
      }
    end
  end

  def submit
    @player = Player.find(params[:player_id])
    @user = User.find(@player[:user_id])
    @player_tile = PlayerTile.where(player_id: params[:player_id], board_tile_id: params[:board_tile_id], ended_at: nil).first
    @book = Book.where(name: params[:title]).first
    if !@book
      @book = Book.create(name: params[:title], author: 'N/G', isbn: 0)
    end
    if params[:review]
      @review = Review.create(book: @book, review_text: params[:review], user: @user)
      @player_tile.update(book: @book, review: @review, ended_at: Time.new)  
    else
      @player_tile.update(book: @book, ended_at: Time.new)  
    end
    ActionCable.server.broadcast('channel', { message: 'Book submitted'})
    render :json => {
      player_tile: @player_tile,
      book: @book
    }
  end

  def open_tile?
    @player_tile = PlayerTile.where(player_id: params[:player_id], board_tile_id: params[:board_tile_id], ended_at: nil).first
    render :json => @player_tile ? true : false
  end

  def any_open_tile?
    @player_tile = PlayerTile.where(player_id: params[:player_id], ended_at: nil).first
    render :json => @player_tile ? true : false
  end

  private
    def player_params
      params.permit(:user_id, :game_id, :color_id, :token_id, :position, :score)
    end
end
