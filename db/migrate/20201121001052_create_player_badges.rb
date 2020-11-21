class CreatePlayerBadges < ActiveRecord::Migration[5.2]
  def change
    create_table :player_badges do |t|
      t.timestamps

      t.references :player, index: true, foreign_key: true
      t.references :board, index: true, foreign_key: true
      t.references :badge, index: true, foreign_key: true
    end
  end
end
