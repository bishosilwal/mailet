FROM ruby:2.5.1

RUN apt-get update && apt-get install apt-transport-https \
    && apt-get remove -y cmdtest \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt update \
    && apt install -y yarn \
    && curl -sL https://deb.nodesource.com/setup_10.x | sh - \
    && apt-get install -y nodejs

WORKDIR /mail-app

COPY Gemfile Gemfile.lock ./
RUN gem update --system --quiet && \
  gem install  bundler -v '~> 2.1'

ENV BUNDLER_VERSION 2.1
RUN bundle check || bundle install

COPY package.json yarn.lock ./
RUN yarn install --check-files

COPY . ./

RUN chmod +x  ./docker-entrypoint/docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint/docker-entrypoint.sh"]
