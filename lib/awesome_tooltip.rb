require 'awesome_tooltip/config'
require 'awesome_tooltip/engine'
require 'awesome_tooltip/railtie'

module AwesomeTooltip
  extend ActiveSupport::Autoload

  autoload :Helpers
end
