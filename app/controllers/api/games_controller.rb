class Api::GamesController < ApplicationController
  def index
    @games = Game.all

    render :json => {
      games: @games
    }
  end

  def show
    @game = Game.find(params[:id])

    render :json => {
      game: @game
    }
  end

  def create
    @game = Game.new(game_params)

    if @game.save
      render :json => {
        game: @game
      }
    else
      render :json => {
        error: 'Game was not saved'
      }
    end
  end

  def update
    @game = Game.find(params[:id])

    if @game.update(game_params)
      render :json => {
        game: @game
      }
    else
      render :json => {
        error: 'Game was not updated'
      }
    end
  end

  def destroy
    @game = Game.find(params[:id])
    @game.destroy

    render :json => {
      message: 'Game was destroyed'
    }
  end

  private
    def game_params
      params.require(:game).permit(:name, :password_digest, :max_players, :ended_at, :user_id)
    end
end
