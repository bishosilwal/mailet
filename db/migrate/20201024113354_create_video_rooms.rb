class CreateVideoRooms < ActiveRecord::Migration[6.0]
  def change
    create_table :video_rooms do |t|
      t.bigint :admin_id
      t.string :slug
      t.timestamps
    end

    add_index :video_rooms, [:admin_id]
  end
end
