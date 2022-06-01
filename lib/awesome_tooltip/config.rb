module AwesomeTooltip
  class << self
    def configure
      yield(config)
    end

    def config
      @config ||= Configuration.new
    end
  end

  class Configuration
    attr_accessor :location, :mount_point, :load_type

    def initialize
      @location = :top
      @mount_point = '/awesome_tooltip'
      @load_type = 'DOMContentLoaded'
    end
  end
end
