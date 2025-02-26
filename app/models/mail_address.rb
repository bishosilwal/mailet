class MailAddress < ApplicationRecord
  DOMAIN = 'mailet.in'
  MAIL_LOCAL_LENGTH = 8

  has_many :video_chat_rooms, foreign_key: 'admin_id'

  validates :mail, presence: true, uniqueness: true
  validate :mail_regex

  before_validation :generate_mail, only: [:create]

  def self.random(opts = {})
    mail = self.create({ mail: opts[:address] })
    self.find(opts[:mail_id])&.destroy if opts[:mail_id].present?
    mail
  end

  def mail_regex
    unless mail =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
      self.errors[:mail] << "is not an valid email"
    end
  end

  def generate_mail
    unless mail.present?
      # check if previous email is exist
      self.mail = random_address
      until !self.class.find_by_mail(self.mail).present? do
        self.mail = random_address
      end
    end
  end

  private

  def local_part
    [*'0'..'9',*'a'..'z'].sample(MAIL_LOCAL_LENGTH).join
  end

  def random_address
    local_part + '@' + DOMAIN
  end
end
