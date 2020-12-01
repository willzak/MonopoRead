class CreateBoards < ActiveRecord::Migration[5.2]
  def change
    create_table :boards do |t|
      t.datetime :ended_at

      t.timestamps

      t.references :game, index: true, foreign_key: true
    end
  end
end
