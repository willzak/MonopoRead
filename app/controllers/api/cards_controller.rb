class Api::CardsController < ApplicationController
  def index
    @cards = Card.all

    render :json => @cards
  end

  def show
    @card = Card.find(params[:id])

    render :json => @card
  end

  def create
    @card = Card.new(card_params)

    if @card.save
      render :json => @card
    else
      render :json => {
        error: 'Card was not saved'
      }
    end
  end

  def update
    @card = Card.find(params[:id])

    if @card.update(card_params)
      render :json => @card
    else
      render :json => {
        error: 'Card was not updated'
      }
    end
  end

  def destroy
    @card = Card.find(params[:id])
    @card.destroy

    render :json => {
      message: 'Card was destroyed'
    }
  end

  private
    def card_params
      params.permit(:name, :description, :effect, :outcome)
    end
end
