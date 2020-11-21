class PlayerTile < ApplicationRecord
  belongs_to :player
  belongs_to :board_tile
  belongs_to :book
  belongs_to :review
end
