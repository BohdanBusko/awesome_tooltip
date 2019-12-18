AwesomeTooltip::Engine.routes do
  get '/awesome_tooltip/tooltip/:template/(:object)' => 'tooltips#show', as: :tooltip
end

Rails.application.routes.draw do
  mount AwesomeTooltip::Engine => '/', as: 'awesome_tooltip'
end
