class EmailChannel < ApplicationCable::Channel
  def subscribed
    stream_from "mail_receiver"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
