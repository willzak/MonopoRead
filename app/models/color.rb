class Color < ApplicationRecord
  has_many :players
  has_many :tile_groups

  validates :name, presence: true
  validates :hexcode, presence: true
end
