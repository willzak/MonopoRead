class AddPositionToPlayers < ActiveRecord::Migration[5.2]
  def change
    add_column :players, :position, :integer
  end
end
