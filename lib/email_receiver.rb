require 'rubygems'
require 'resque'
require 'redis'

class EmailReceive
  @queue = :incoming_email_queue

  def initialize(content)
    begin
      Resque.enqueue(EmailReceive, content)
    rescue  => e
      puts "Error!!!"
      puts e.full_message
    end
  end
end
EmailReceive.new($stdin.read)