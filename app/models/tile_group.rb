class TileGroup < ApplicationRecord
  belongs_to :color
  
  has_many :tiles

  validates :name, presence: true
end
