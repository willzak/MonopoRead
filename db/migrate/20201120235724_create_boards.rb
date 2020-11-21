class CreateBoards < ActiveRecord::Migration[5.2]
  def change
    create_table :boards do |t|
      t.string :win_requirement
      t.integer :win_points
      t.boolean :isbn_trust
      t.boolean :isbn_master
      t.boolean :isbn_vote
      t.integer :turn_delay
      t.integer :turn_reminder
      t.datetime :ended_at

      t.timestamps

      t.references :game, index: true, foreign_key: true
    end
  end
end
