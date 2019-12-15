AwesomeTooltip::Engine.routes do
  get '/awesome_tooltip/hello_world' => 'application#hello_world', as: :hello_world
end

Rails.application.routes.draw do
  mount AwesomeTooltip::Engine => '/', as: 'awesome_tooltip'
end
