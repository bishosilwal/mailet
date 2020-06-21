class CreateMailAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :mail_addresses do |t|
      t.string :mail

      t.timestamps
    end
  end
end
