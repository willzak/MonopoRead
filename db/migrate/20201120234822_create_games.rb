class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :name
      t.string :password_digest
      t.integer :max_players
      t.string :win_requirement
      t.integer :win_points
      t.boolean :isbn_trust
      t.boolean :isbn_master
      t.boolean :isbn_vote
      t.integer :turn_delay
      t.integer :turn_reminder
      t.datetime :ended_at

      t.timestamps

      t.references :user, foreign_key: true 
    end
  end
end
