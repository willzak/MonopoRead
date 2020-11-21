class BoardTile < ApplicationRecord
  belongs_to :board
  belongs_to :tile

  has_many :player_tiles
end
