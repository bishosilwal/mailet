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

  task :update_npx_db do
    on roles(:all) do |host|
      within release_path do
        execute :bundle, 'install'
        system "yarn install"
      end
      system "npx browserslist@latest --update-db"
    end
  end

  desc "upload linked files"
  task :upload_files do
    on roles(:all) do |host|
      puts "uploading database and secret file"
      upload! 'config/database.yml', "#{shared_path}/config/database.yml"
      upload! 'config/secret.yml', "#{shared_path}/config/secret.yml"
    end
  end

  before "deploy:check:linked_files", :upload_files
  before :updating, :update_binstub
  before "deploy:assets:precompile", :update_npx_db
end
