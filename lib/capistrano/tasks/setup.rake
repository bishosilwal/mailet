require 'byebug'

namespace "deploy" do

  desc "Stop all the running application process"
  task :stop_all_process do
    on roles(:all) do |host|
      within shared_path do
        # kill all the rails process
        execute "killall -9 ruby"
        execute "killall -9 tail"
        execute "killall -9 htop"
        execute "tmux kill-session -t mailet"
      end
    end
  end

  desc "Restart all the application process"
  task :restart_all_process do
    on roles(:all) do |host|
      within release_path do
        execute :rake, 'sitemap:refresh'
      end
      within shared_path do
        execute "cd #{shared_path} && ./mailet-tmux-server-setup.sh"
      end
    end
  end

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
        puts "Installing node modules"
        execute "cd #{release_path} && yarn install --silent"
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
        execute "cd #{shared_path} && mkdir -p pdfs"
        execute "cd #{shared_path} && mkdir -p log"
        execute "cd #{shared_path} && touch log/puma.stdout.log"
        execute "cd #{shared_path} && touch log/puma.stderr.log"
      end
    end
  end

  desc "print env"
  task :print_env do
    on release_roles(:all) do
      puts capture("env")
    end
  end

  before :starting, :stop_all_process
  after :finishing, :restart_all_process

  before "deploy:check:linked_files", :upload_files
  before :updating, :update_binstub
  before "deploy:assets:precompile", :lib_install
end
