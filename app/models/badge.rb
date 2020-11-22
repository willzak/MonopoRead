class Badge < ApplicationRecord
  has_many :player_badges

  validates :name, presence: true
  validates :tier, presence: true
end
