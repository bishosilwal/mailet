class EmailChannel < ApplicationCable::Channel
  def subscribed
    stream_from "mail_receiver_#{params[:mail_address]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
