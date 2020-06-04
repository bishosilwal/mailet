require "resque/tasks"
task "resque:setup" => :environment
require '~/files/workspace/mail-generate/lib/resque_process_email.rb'
