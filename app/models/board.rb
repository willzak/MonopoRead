class Board < ApplicationRecord
  belongs_to :game

  has_many :board_tiles
  has_many :player_badges
end
