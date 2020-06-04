Rails.application.routes.draw do
  mount Resque::Server, :at => "/resque"

  get 'home/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
end
