class Message < ApplicationRecord
  validates_presence_of :to
  validates_presence_of :from
end
