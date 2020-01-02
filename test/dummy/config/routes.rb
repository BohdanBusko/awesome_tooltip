Rails.application.routes.draw do
  resources :projects
  root to: 'projects#index'
  get '/tooltip', to: 'home#index', as: :home
end
