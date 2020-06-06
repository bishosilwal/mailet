class EmailChannel < ApplicationCable::Channel
  def subscribed
    stream_from "mail_receiver"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def get_email
    ActionCable.server.broadcast('mail_receiver', email: Message.last)
  end
end
