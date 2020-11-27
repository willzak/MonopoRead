class AddColumnsToPlayer < ActiveRecord::Migration[5.2]
  def change
    add_column :players, :moving, :boolean
    add_column :players, :final_position, :integer
  end
end
