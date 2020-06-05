class InvalidReplyUser    < StandardError ; end

class EmailReceive
  @queue = :incoming_email_queue

  def self.perform(from, to, subject, body)
    user = User.first

    if user.nil?
      raise InvalidReplyUser, "User with email = #{from} is not a member of the app."
    end

    params = {
        :body     => body,
        :to       => to,
        :subject  => subject,
        :from     => from
    }

    message = user.messages.new(params)
    unless message.save
      raise RuntimeError, "Unable to save message. Errors: #{message.errors.inspect}"
    end
    ActionCable.server.broadcast('mail_receiver', email: message)
  end
end