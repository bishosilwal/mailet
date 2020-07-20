class TempMailSenderJob < ApplicationJob
  queue_as :default

  def perform(*args)
    message = args.first
    UserMailer.reply_mail(message).deliver_now
  end
end
