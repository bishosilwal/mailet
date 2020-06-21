require "resque/tasks"

task "resque:setup" => :environment
require Rails.root.join('lib/resque_process_email.rb')
