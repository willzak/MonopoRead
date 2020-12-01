class User < ApplicationRecord
  has_secure_password

  has_many :games
  has_many :players
  has_many :reviews

  validates :name, presence: true
  validates :email, presence: true
  validates :password_digest, presence: true
  validates_uniqueness_of :email
end
