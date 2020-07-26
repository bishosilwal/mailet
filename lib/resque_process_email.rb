class InvalidReplyUser    < StandardError ; end

class EmailReceive
  @queue = :incoming_email_queue

  def self.perform(content)
    mail    = Mail.read_from_string(content)
    body    = mail.body.decoded
    from    = mail.from.first
    to      = mail.to&.first
    subject = mail.subject

    if mail.multipart?
      body = mail.html_part.decoded
    else
      body = mail.decoded
    end

    puts '............................. Mail raw content start .............................'
    puts content
    puts "............................. Mail raw content end ............................."

    params = {
        :body     => body,
        :to       => to,
        :subject  => subject,
        :from     => from
    }

    mail_exists = MailAddress.find_by(mail: params.to)
    if mail_exists.present?
      message = Message.new(params)
      unless message.save
        raise RuntimeError, "Unable to save message. Errors: #{message.errors.inspect}"
      end
      ActionCable.server.broadcast("mail_receiver_#{message.to}", email: message)
    end
  end
end