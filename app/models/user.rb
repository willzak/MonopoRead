class User < ApplicationRecord
  has_many :games
  has_many :players
  has_many :reviews
end
