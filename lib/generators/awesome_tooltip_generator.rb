class AwesomeTooltipGenerator < Rails::Generators::NameBase
  source_root File.expand_path('../templates', __FILE__)

  def copy_initializer
    template 'awesome_tooltip.rb', 'config/intializers/awesome_tooltip.rb'
  end
end
