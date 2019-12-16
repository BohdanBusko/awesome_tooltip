AwesomeTooltip::Engine.routes do
  get '/awesome_tooltip/tooltip' => 'tooltips#show', as: :tooltip
end

Rails.application.routes.draw do
  mount AwesomeTooltip::Engine => '/', as: 'awesome_tooltip'
end
