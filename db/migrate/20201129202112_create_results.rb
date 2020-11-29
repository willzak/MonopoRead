class CreateResults < ActiveRecord::Migration[5.2]
  def change
    create_table :results do |t|
      t.integer :score
      t.integer :books
      t.boolean :winner

      t.timestamps

      t.references :player, foreign_key: true
      t.references :board, foreign_key: true
    end
  end
end
