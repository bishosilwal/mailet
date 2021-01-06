#!/bin/sh

set -e

echo "Running web service"
if [ -f tmp/pids/server.pid ]; then
  rm tmp/pids/server.pid
fi

if [ "$RAILS_ENV" = "development" ];
then
  RAILS_ENV="$RAILS_ENV" bundle exec bin/webpack-dev-server &
elif [ "$RAILS_ENV" = "production" ];
then
  RAILS_ENV="$RAILS_ENV" bundle exec rails assets:precompile
fi

RAILS_ENV="$RAILS_ENV" bundle exec rake db:migrate
RAILS_ENV="$RAILS_ENV" bundle exec rails s -b 0.0.0.0 &
RAILS_ENV="$RAILS_ENV" bundle exec rake resque:work QUEUE='*'