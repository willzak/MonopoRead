class Book < ApplicationRecord
  has_many :recommendations
  has_many :reviews
  has_many :player_tiles

  validates :name, presence: true
  validates :author, presence: true
  validates :isbn, presence: true
end
