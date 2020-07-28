class UserMailer < ApplicationMailer

  def reply_mail(message)
    @body = message.body.html_safe
    mail(
      to: message.to,
      subject: message.subject,
      from: message.from,
    )
  end
end
