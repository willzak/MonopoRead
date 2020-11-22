class Api::UsersController < ApplicationController
  def index
    @users = User.all

    render :json => {
      users: @users
    }
  end

  def show
    @user = User.find(params[:id])

    render :json => {
      user: @user
    }
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render :json => {
        user: @user
      }
    else
      render :json => {
        error: 'User was not saved'
      }
    end
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render :json => {
        user: @user
      }
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

  def games
    @games = User.find(params[:id]).players.all.map { |player| Game.find(player[:game_id]) }

    render :json => {
      games: @games
    }
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password_digest)
    end
end
