class TileGroup < ApplicationRecord
  belongs_to :color
  
  has_many :tiles
end
