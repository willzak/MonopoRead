class CreateTileGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :tile_groups do |t|
      t.string :name
      t.text :description

      t.timestamps

      t.references :color, index: true, foreign_key: true
    end
  end
end
