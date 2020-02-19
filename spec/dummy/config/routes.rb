Rails.application.routes.draw do
  mount AwesomeTooltip::Engine => '/'

  resources :projects, except: [:show, :index]
  root to: 'projects#index'
  get '/tooltip', to: 'home#index', as: :tooltips
end
