class CreateTooltips < ActiveRecord::Migration[6.0]
  def change
    create_table :tooltips do |t|
      t.string :template
      t.string :object
      t.integer :object_id

      t.timestamps
    end
  end
end
