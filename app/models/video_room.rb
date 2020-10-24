class VideoRoom < ApplicationRecord
  belongs_to :admin, class_name: 'MailAddress', foreign_key: 'admin_id'

  def self.create_random(mail_id)
    self.create(admin_id: mail_id, slug: SecureRandom.alphanumeric(20))
  end
end
