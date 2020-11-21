class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :name
      t.string :password_digest
      t.integer :max_players
      t.datetime :ended_at

      t.timestamps

      t.references :user, foreign_key: true 
    end
  end
end
