class Color < ApplicationRecord
  has_many :players
  has_many :tile_groups
end
