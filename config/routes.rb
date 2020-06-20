Rails.application.routes.draw do
  mount Resque::Server, :at => "/resque"

  post '/send_email', to: 'mail_sender#send_mail', as: 'mail_sender'
  post '/mail_address', to: 'mail_address#create', as: :mail_addresses
  delete '/mail_address', to: 'mail_address#destroy', as: :mail_address

  get 'home/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
end
