class Api::ResultController < ApplicationController
  def index
    @results = Result.where(board_id: params[:board_id])

    render :json => @results
  end

  def show
    @result = Result.find(params[:id])

    render :json => @result
  end

  def create
    @result = Result.new(result_params)

    if @result.save
      render :json => @result
    else
      render :json => {
        error: 'Result was not saved'
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