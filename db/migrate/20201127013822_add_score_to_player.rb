class AddScoreToPlayer < ActiveRecord::Migration[5.2]
  def change
    add_column :players, :score, :integer
  end
end
