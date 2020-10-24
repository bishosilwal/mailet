class VideoRoom < ApplicationRecord
  belongs_to :admin, class_name: 'MailAddress', foreign_key: 'admin_id'

  def self.create_random(mail_address: , slug: )
    VideoRoom.find_by_slug(slug)&.destroy if slug.present?
    mail = MailAddress.find_by_mail(mail_address)
    self.create(admin_id: mail.id, slug: SecureRandom.alphanumeric(20))
  end
end
