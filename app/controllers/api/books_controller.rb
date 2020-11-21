class Api::BooksController < ApplicationController
  def index
    @books = Book.all

    render :json => {
      books: @books
    }
  end

  def show

  end

  def new

  end

  def edit

  end

  def create

  end

  def update

  end

  def destroy

  end
end
