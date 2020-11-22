class Review < ApplicationRecord
  belongs_to :book
  belongs_to :user

  has_many :player_tiles

  validates :review_text, presence: true
end
