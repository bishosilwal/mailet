Rails.application.routes.draw do
  mount Resque::Server, :at => "/resque"

  post '/send_email', to: 'mail_sender#send_mail', as: 'mail_sender'
  get 'home/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
end
