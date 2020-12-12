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

  task :config_symlink do
    # upload "../../../config/database.yml", "#{shared_path}/shared/config/database.yml"
    # run "cp #{shared_path}/config/database.yml #{release_path}/config/database.yml"
  end

  task :update_npx_db do
    on roles(:all) do |host|
      within release_path do
        system "yarn install"
      end
      system "npx browserslist@latest --update-db"
    end
  end

  before :updating, :update_binstub
  before "deploy:migrate","deploy:config_symlink"
  before "deploy:assets:precompile", :update_npx_db
end
