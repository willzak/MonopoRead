class CreateBoardTiles < ActiveRecord::Migration[5.2]
  def change
    create_table :board_tiles do |t|
      t.timestamps

      t.references :board, index: true, foreign_key: true
      t.references :tile, index: true, foreign_key: true
    end
  end
end
