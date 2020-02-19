AwesomeTooltip::Engine.routes do
  get '/tooltip/:template/(:object)', to: 'tooltips#show'
end
