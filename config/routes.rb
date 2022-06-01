AwesomeTooltip::Engine.routes do
  get '/tooltip', to: 'tooltips#show', as: :tooltip
end

Rails.application.routes.draw do
  mount AwesomeTooltip::Engine => AwesomeTooltip.config.mount_point
end
