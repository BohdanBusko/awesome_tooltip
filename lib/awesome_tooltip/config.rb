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
    attr_accessor :location, :mount_point

    def initialize
      @location = :top
      @mount_point = '/awesome_tooltip'
    end
  end
end
