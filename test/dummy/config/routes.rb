Rails.application.routes.draw do
  mount AwesomeTooltip::Engine => '/', as: 'awesome_tooltip'

  resources :projects, except: [:show, :index]
  root to: 'projects#index'
  get '/tooltip', to: 'home#index', as: :tooltips
end
