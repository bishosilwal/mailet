require 'byebug'
namespace "deploy" do
  desc "setting up server"
  task :update_binstub do
    on roles(:all) do |host|
      puts "update bundler"
      within release_path do
        execute :bundle, 'update --bundler'
        execute :bundle, "lock --add-platform x86-mingw32 x86-mswin32 x64-mingw32 java"
      end
    end
  end

  desc "install gems and node modules"
  task :lib_install do
    on roles(:all) do |host|
      within release_path do
        execute :bundle, 'install'
        # execute "gem install tzinfo "
        # execute "gem install activesupport-6.0.3.4 "
        # execute "gem install nokogiri"
        puts "Installing node modules"
        execute "yarn install"
      end
    end
  end

  desc "upload linked files"
  task :upload_files do
    on roles(:all) do |host|
      puts "uploading database and secret file"
      upload! 'config/database.yml', "#{shared_path}/config/database.yml"
      upload! 'config/secret.yml', "#{shared_path}/config/secret.yml"
      within shared_path do
        execute "mkdir -p log"
        execute "touch log/puma.stdout.log"
        execute "touch log/puma.stderr.log"
      end
    end
  end

  desc "print env"
  task :print_env do
    on release_roles(:all) do
      puts capture("env")
    end

  end

  before "deploy:check:linked_files", :upload_files
  before :updating, :update_binstub
  before "deploy:assets:precompile", :lib_install
end
