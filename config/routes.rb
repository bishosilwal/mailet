Rails.application.routes.draw do
  # mount Resque::Server, :at => "/resque"
  mount ActionCable.server => '/cable'

  scope 'mail_address' do
    post '/', to: 'mail_address#create', as: :mail_addresses
    delete '/', to: 'mail_address#destroy', as: :mail_address
    get '/change', to: 'mail_address#change', as: :mail_address_change
    post '/change', to: 'mail_address#custom_address', as: :custom_mail_address
  end

  scope 'mail' do
    get '/download', to: 'home#download_pdf'
    get '/send', to: 'mail_sender#new', as: :new_mail_sender
    post '/send', to: 'mail_sender#create', as: :mail_sender
  end

  resources :video_chat, only: [:new] do
    collection do
      post '/room', to: 'video_chat#room'
      get '/join', to: 'video_chat#join'
      get '/room', to: 'video_chat#check_room'
    end
  end

  scope 'blog' do
    get '/temporary-disposable-email-address', to: 'blog#tmp_email_description', as: :tmp_email_description
    get '/what-we-offer-at-mailet', to: 'blog#what_we_offer'
  end
  get 'home/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
end
