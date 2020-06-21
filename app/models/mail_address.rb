class MailAddress < ApplicationRecord
  DOMAIN = 'generatemail.com'
  MAIL_LOCAL_LENGTH = 8

  validates :mail, presence: true, uniqueness: true
  validate :mail_regex

  before_validation :generate_mail, only: [:create]

  def self.random
    self.create
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
    [*'0'..'9',*'A'..'Z',*'a'..'z'].sample(MAIL_LOCAL_LENGTH).join
  end

  def random_address
    local_part + '@' + DOMAIN
  end
end
