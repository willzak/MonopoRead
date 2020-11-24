class Api::PlayerCardsController < ApplicationController
  def index
    render :json => {
      error: "Player Cards only accessible through '/boards/:board_id/player_chance' (player cards for specific board) or '/boards/:board_id/players/:player_id/player_chance' (player cards for specific player on specific board)"
    }
  end

  def show
    @player_card = PlayerCard.find(params[:id])

    render :json => @player_card
  end

  def create
    @player_card = PlayerCard.new(player_card_params)

    if @player_card.save
      render :json => @player_card
    else
      render :json => {
        error: 'Player Card was not saved'
      }
    end
  end

  def update
    @player_card = PlayerCard.find(params[:player_card_id])

    if @player_card.update(player_card_params)
      render :json => @player_card
    else
      render :json => {
        error: 'Player Card was not updated'
      }
    end
  end

  def destroy
    @player_card = PlayerCard.find(params[:id])
    @player_card.destroy

    render :json => {
      message: 'Player Card was destroyed'
    }
  end

  private
    def player_card_params
      params.permit(:player_id, :board_id, :card_id)
    end
end