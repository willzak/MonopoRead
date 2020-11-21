class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.text :review_text

      t.timestamps

      t.references :book, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
    end
  end
end
