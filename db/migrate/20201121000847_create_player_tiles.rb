class CreatePlayerTiles < ActiveRecord::Migration[5.2]
  def change
    create_table :player_tiles do |t|
      t.datetime :ended_at

      t.timestamps

      t.references :player, index: true, foreign_key: true
      t.references :board_tile, index: true, foreign_key: true
      t.references :book, index: true, foreign_key: true
      t.references :review, index: true, foreign_key: true
    end
  end
end
