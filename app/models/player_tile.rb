class PlayerTile < ApplicationRecord
  belongs_to :player
  belongs_to :board_tile
  belongs_to :book, optional: true
  belongs_to :review, optional: true
end
