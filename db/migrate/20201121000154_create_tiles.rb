class CreateTiles < ActiveRecord::Migration[5.2]
  def change
    create_table :tiles do |t|
      t.string :name
      t.text :description

      t.timestamps

      t.references :tile_group, index: true, foreign_key: true
    end
  end
end
