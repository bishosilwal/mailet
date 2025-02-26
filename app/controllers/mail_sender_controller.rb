class MailSenderController < ApplicationController
  def new

  end

  def create
    message_params[:body] = message_params[:body].html_safe
    message = Message.create(message_params)
    TempMailSenderJob.perform_later message
    if message.persisted?
      render json: { status: '', message: 'Mail sent', details: "", sent_message: message}
    else
      render json: { status: '', message: 'Failed!', details: "Sending mail failed"}
    end
  end

  private

  def message_params
    params.require(:new_message).permit(:to, :from, :subject, :body)
  end
end
