class Tile < ApplicationRecord
  belongs_to :tile_group

  has_many :recommendations
  has_many :board_tiles

  validates :name, presence: true
  validates :description, presence: true
end
