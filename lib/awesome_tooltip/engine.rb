module AwesomeTooltip
  class Engine < ::Rails::Engine
    isolate_namespace AwesomeTooltip

    initializer 'awesome_tooltip.assets_precompile', group: :all do |app|
      app.config.assets.precompile += [
        'awesome_tooltip/tooltip.js',
        'awesome_tooltip/tooltip.scss'
      ]
    end
  end
end
