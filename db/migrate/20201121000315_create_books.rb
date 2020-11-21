class CreateBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :books do |t|
      t.string :name
      t.string :author
      t.text :cover_image
      t.string :genre
      t.string :isbn

      t.timestamps
    end
  end
end
