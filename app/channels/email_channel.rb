class EmailChannel < ApplicationCable::Channel
  def subscribed
    stream_from "mail_receiver"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def get_temp_mail_address
    ActionCable.server.broadcast('mail_receiver', mail_address: 'temp_mail@generatemail.com')
  end
end
