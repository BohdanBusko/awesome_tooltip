class AwesomeTooltip::ApplicationController < ActionController::Base
  def hello_world
    render json: { html: 'Hello world' }
  end
end
