class Tile < ApplicationRecord
  belongs_to :tile_group

  has_many :recommendations
  has_many :board_tiles
end
