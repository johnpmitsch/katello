class CreateKatelloFruits < ActiveRecord::Migration[5.2]
  def change
    create_table :katello_fruits do |t|
      t.string :name
      t.string :color

      t.timestamps
    end
  end
end
