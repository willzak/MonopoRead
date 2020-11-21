class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players do |t|
      t.timestamps

      t.references :user, index: true, foreign_key: true
      t.references :game, index: true, foreign_key: true
      t.references :color, index: true, foreign_key: true
      t.references :token, index: true, foreign_key: true
    end
  end
end
