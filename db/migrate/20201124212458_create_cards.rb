class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :name
      t.text :description
      t.string :effect
      t.integer :outcome

      t.timestamps
    end
  end
end
