rails_root = ENV['RAILS_ROOT'] || File.dirname(__FILE__) + '/../..'
rails_env = ENV['RAILS_ENV'] || 'development'

Resque.redis =  Redis.new(url: 'redis://localhost:6379/2')
Resque.logger = Logger.new(Rails.root.join('log', "#{Rails.env}_resque.log"))
