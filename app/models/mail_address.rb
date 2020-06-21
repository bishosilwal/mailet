class MailAddress < ApplicationRecord
  validates :mail, presence: true
  validate :mail_regex

  def self.random
    self.create(mail: 'test@gmail.com')
  end

  def mail_regex
    unless mail =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
      self.errors[:mail] << "is not an valid email"
    end
  end
end
