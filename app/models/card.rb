class Card < ApplicationRecord
  has_many :player_cards

  validates :name, presence: true
  validates :description, presence: true
  validates :effect, presence: true
  validates :outcome, presence: true
end
