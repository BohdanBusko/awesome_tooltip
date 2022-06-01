Rails.application.routes.draw do
  get '/tooltip', to: 'home#index', as: :tooltips

  resources :projects, except: [:show, :index]

  root to: 'projects#index'
end
