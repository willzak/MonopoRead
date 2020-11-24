class CreatePlayerCards < ActiveRecord::Migration[5.2]
  def change
    create_table :player_cards do |t|
      t.timestamps

      t.references :player, index: true, foreign_key: true
      t.references :board, index: true, foreign_key: true
      t.references :card, index: true, foreign_key: true
    end
  end
end
