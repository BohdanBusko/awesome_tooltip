AwesomeTooltip::Engine.routes do
  get '/tooltip/:template/(:object)' => 'tooltips#show', as: :tooltip
end
