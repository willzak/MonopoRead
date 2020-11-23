require 'open-uri'
require 'json'
require 'active_support/core_ext'

class Api::BooksController < ApplicationController
  def index
    @books = Book.all

    render :json => @books
  end

  def show
    @book = Book.find(params[:id])

    render :json => @book
  end

  def create
    @book = Book.new(book_params)

    if @book.save
      render :json => @book
    else
      render :json => {
        error: 'Book was not saved'
      }
    end
  end

  def update
    @book = Book.find(params[:id])

    if @book.update(book_params)
      render :json => @book
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

  def goodreads
    @book = Book.find(params[:book_id])
    if @book[:isbn]
      @goodread = JSON.parse(Hash.from_xml(open("https://www.goodreads.com/search/search.xml?q=#{@book[:isbn]}&key=hfvqo7Dwujbu5U0V5coh4w").read).to_json)

      render :json => @goodread
    else
      render :json => {
        message: 'Book does not have ISBN'
      }
    end
  end

  def google
    @book = Book.find(params[:book_id])
    if @book[:isbn]
      @google = JSON.parse(open("https://www.googleapis.com/books/v1/volumes?q=isbn:#{@book[:isbn]}").read)

      render :json => @google
    else
      render :json => {
        message: 'Book does not have ISBN'
      }
    end
  end

  def goodreads_search
    @goodread = JSON.parse(Hash.from_xml(open("https://www.goodreads.com/search/search.xml?q=#{params[:search]}&key=hfvqo7Dwujbu5U0V5coh4w").read).to_json)

    render :json => @goodread
  end

  def google_search
    @google = JSON.parse(open("https://www.googleapis.com/books/v1/volumes?q=#{params[:search]}").read)

    render :json => @google
  end

  private
    def book_params
      params.permit(:name, :author, :cover_image, :genre, :isbn)
    end
end
