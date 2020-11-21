class Book < ApplicationRecord
  has_many :recommendations
  has_many :reviews
  has_many :player_tiles
end
