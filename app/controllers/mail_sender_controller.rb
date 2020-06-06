class MailSenderController < ApplicationController

  def send_mail
    UserMailer.reply_mail(params['new_message']).deliver_now
    render json: { status: '', message: 'Mail sent'}
  end

  private

  def message_params
    params.require(:new_message).permit(:to, :from, :subject, :body)
  end
end
