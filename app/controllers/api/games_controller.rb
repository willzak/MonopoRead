class Api::GamesController < ApplicationController
  def index
    @games = Game.all

    render :json => @games
  end

  def show
    @game = Game.find(params[:id])

    render :json => @game
  end

  def create
    @game = Game.new(game_params)

    if @game.save
      render :json => @game
    else
      render :json => {
        error: 'Game was not saved'
      }
    end
  end

  def update
    @game = Game.find(params[:id])

    if @game.update(game_params)
      render :json => @game
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
    @players = @players.map { |player| { player: player, color: Color.find(player[:color_id]), user: User.find(player[:user_id]) } }

    render :json => @players
  end

  def users
    @users = Game.find(params[:game_id]).players.all.map { |player| User.find(player[:user_id]) }

    render :json => @users
  end

  def free_colors
    @game = Game.find(params[:game_id])
    @used_colors = Game.find(params[:game_id]).players.all.pluck(:color_id)
    @colors = Color.all.select { |color| !@used_colors.include?(color[:id])}

    render :json => @colors
  end

  def boards
    @game = Game.find(params[:game_id])
    @boards = Board.where(game: @game)

    render :json => @boards
  end

  def current_board
    @game = Game.find(params[:game_id])
    @current_board = Board.where(game: @game, ended_at: nil).first
    if !@current_board
      @current_board = Board.where(game: @game).order("ended_at").last
    end

    render :json => @current_board
  end

  private
    def game_params
      params.permit(:name, :password_digest, :max_players, :ended_at, :user_id)
    end
end
