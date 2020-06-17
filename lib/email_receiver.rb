#!/usr/bin/env ruby
require 'rubygems'
require 'resque'
require 'redis'

class EmailReceive
  @queue = :incoming_email_queue

  def initialize(content)
    Resque.enqueue(EmailReceive, content)
  end
end
EmailReceive.new($stdin.read)