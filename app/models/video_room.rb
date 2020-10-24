class VideoRoom < ApplicationRecord
  belongs_to :admin, class_name: 'MailAddress', foreign_key: 'admin_id'
end
