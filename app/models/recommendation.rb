class Recommendation < ApplicationRecord
  belongs_to :book
  belongs_to :tile
end
