#!/bin/sh

set -e

echo "Running web service"
if [ -f tmp/pids/server.pid ]; then
  rm tmp/pids/server.pid
fi

bundle exec rake db:migrate
bundle exec rails s -b 0.0.0.0 &
bundle exec rake resque:work QUEUE='*'