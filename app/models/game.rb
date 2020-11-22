class Game < ApplicationRecord
  belongs_to :user

  has_many :players
  has_many :boards

  validates :name, presence: true
end
