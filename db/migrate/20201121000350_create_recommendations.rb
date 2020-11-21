class CreateRecommendations < ActiveRecord::Migration[5.2]
  def change
    create_table :recommendations do |t|
      t.timestamps

      t.references :book, index: true, foreign_key: true
      t.references :tile, index: true, foreign_key: true
    end
  end
end
