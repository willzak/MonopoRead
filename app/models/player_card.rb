class PlayerCard < ApplicationRecord
  belongs_to :card
  belongs_to :player
  belongs_to :board
end
