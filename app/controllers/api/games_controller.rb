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

  def players
    @players = Game.find(params[:game_id]).players.all

    render :json => {
      players: @players
    }
  end

  def users
    @users = Game.find(params[:game_id]).players.all.map { |player| User.find(player[:user_id]) }

    render :json => {
      users: @users
    }
  end

  def free_colors
    @game = Game.find(params[:game_id])
    @used_colors = Game.find(params[:game_id]).players.all.pluck(:color_id)
    @colors = Color.all.select { |color| !@used_colors.include?(color[:id])}

    render :json => {
      colors: @colors
    }
  end

  def boards
    @game = Game.find(params[:game_id])
    @boards = Board.where(game: @game)

    render :json => {
      boards: @boards
    }
  end

  def current_board
    @game = Game.find(params[:game_id])
    @current_board = Board.where(game: @game, ended_at: nil)
    if @current_board.empty?
      @current_board = Board.where(game: @game, ended_at: nil).order("ended_at").last
    end

    render :json => {
      current_board: @current_board
    }
  end

  private
    def game_params
      params.permit(:name, :password_digest, :max_players, :ended_at, :user_id)
    end
end
