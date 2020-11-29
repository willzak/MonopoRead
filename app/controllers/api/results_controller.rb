class Api::ResultsController < ApplicationController
  def index
    @results = Result.where(board_id: params[:board_id])

    render :json => @results
  end

  def show
    @result = Result.find(params[:id])

    render :json => @result
  end

  def create
    @results = params[:playerStats].map { |player| Result.create(board_id: params[:board_id], player_id: player[:id], score: player[:points], books: player[:books], winner: params[:winner] == player[:id] ? true : false) }
    error = false
    @results.each do |result| 
      if !result
        error = true
      end
    end

    if !error
      render :json => @results
    else
      render :json => {
        error: 'Results were not saved'
      }
    end
  end

  def update
    @result = Result.find(params[:id])

    if @result.update(result_params)
      render :json => @result
    else
      render :json => {
        error: 'Result was not updated'
      }
    end
  end

  def destroy
    @result = Result.find(params[:id])
    @result.destroy

    render :json => {
      message: 'Result was destroyed'
    }
  end

  def tiles
    @result = Result.find(params[:result_id])
    @tiles = @result.tiles

    render :json => @tiles
  end

  private
    def result_params
      params.permit(:player_id, :board_id, :score, :books, :winner)
    end
end