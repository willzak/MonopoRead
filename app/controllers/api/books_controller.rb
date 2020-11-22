class Api::BooksController < ApplicationController
  def index
    @books = Book.all

    render :json => {
      books: @books
    }
  end

  def show
    @book = Book.find(params[:id])

    render :json => {
      book: @book
    }
  end

  def create
    @book = Book.new(book_params)

    if @book.save
      render :json => {
        book: @book
      }
    else
      render :json => {
        error: 'Book was not saved'
      }
    end
  end

  def update
    @book = Book.find(params[:id])

    if @book.update(book_params)
      render :json => {
        book: @book
      }
    else
      render :json => {
        error: 'Book was not updated'
      }
    end
  end

  def destroy
    @book = Book.find(params[:id])
    @book.destroy

    render :json => {
      message: 'Book was destroyed'
    }
  end

  private
    def book_params
      params.permit(:name, :author, :cover_image, :genre, :isbn)
    end
end
