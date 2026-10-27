FROM ruby:3.3-bookworm

ENV LC_ALL C.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV BUNDLE_FROZEN=true

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock just-the-docs.gemspec ./
RUN gem install bundler --version 2.5.9 --no-document && bundle install

EXPOSE 4000
