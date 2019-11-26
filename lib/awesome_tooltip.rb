require "awesome_tooltip/railtie"

module AwesomeTooltip
  class << self
    def load!
      register_rails_engine
    end

    private

    def register_rails_engine
      require 'awesome_tooltip/engine'
    end
  end
end

# AwesomeTooltip.load!
