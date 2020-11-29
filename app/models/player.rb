class Player < ApplicationRecord
  belongs_to :user
  belongs_to :game
  belongs_to :color
  belongs_to :token, optional: true

  has_many :player_tiles
  has_many :player_badges
  has_many :results
end
