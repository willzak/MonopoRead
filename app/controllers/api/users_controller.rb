class Api::UsersController < ApplicationController
  def index
    @users = User.all

    render :json => @users
  end

  def show
    @user = User.find(params[:id])

    render :json => @user
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render :json => @user
    else
      render :json => {
        error: 'User was not saved'
      }
    end
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render :json => @user
    else
      render :json => {
        error: 'User was not updated'
      }
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy

    render :json => {
      message: 'User was destroyed'
    }
  end

  def game_lists
    @playable_games = playable_games(params[:user_id])
    @joinable_games = joinable_games(params[:user_id])
    @ended_games = ended_games(params[:user_id])

    render :json => {
      playable_games: @playable_games,
      joinable_games: @joinable_games,
      ended_games: @ended_games
    }
  end

  def playable_games(user_id)
    @joined_games = Player.where(user_id: user_id).pluck(:game_id)
    @games = Game.where(id: @joined_games, ended_at: nil)

    return @games
  end

  def joinable_games(user_id)
    @joined_games = Player.where(user_id: user_id).pluck(:game_id)
    @games = Game.where.not(id: @joined_games).where(ended_at: nil)
    @games = @games.select { |game| game.players.count < 4 }

    return @games
  end

  def ended_games(user_id)
    @joined_games = Player.where(user_id: user_id).pluck(:game_id)
    @games = Game.where.not(ended_at: nil).where(id: @joined_games)

    return @games
  end

  private
    def user_params
      params.permit(:name, :email, :password_digest)
    end
end
