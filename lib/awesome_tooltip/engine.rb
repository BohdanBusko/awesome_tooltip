module AwesomeTooltip
  class Engine < ::Rails::Engine
    isolate_namespace AwesomeTooltip

    initializer 'awesome_tooltip.assets_precompile', group: :all do |app|
      app.config.assets.precompile += [
        'awesome_tooltip/tooltip.js',
        'awesome_tooltip/tooltip.scss'
      ]
    end

    initializer "sample_engine.factories", after: "factory_bot.set_factory_paths" do
      FactoryBot.definition_file_paths << File.expand_path('../../../spec/factories', __FILE__) if defined?(FactoryBot)
    end

    initializer 'awesome_tooltip.helpers' do
      ActiveSupport.on_load :action_view do
        include AwesomeTooltip::Helpers
      end
    end

    config.generators do |g|
      g.test_framework :rspec
    end
  end
end
