class EmailChannel < ApplicationCable::Channel
  def subscribed
    stream_from "mail_receiver_#{params[:mail_address]}"
  end

  def unsubscribed
    MailAddress.find_by(mail: params[:mail_address])&.destroy
    # Any cleanup needed when channel is unsubscribed
  end
end
