class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.string :to
      t.string :from
      t.string :subject
      t.text :body
      t.text :raw
      t.timestamps
    end
  end
end
