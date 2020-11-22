class Token < ApplicationRecord
  has_many :players

  validates :name, presence: true
  validates :image, presence: true
end
