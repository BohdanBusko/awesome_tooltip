$:.push File.expand_path("lib", __dir__)

# Maintain your gem's version:
require "awesome_tooltip/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |spec|
  spec.name        = "awesome_tooltip"
  spec.version     = AwesomeTooltip::VERSION
  spec.authors     = ["Busko Bogdan"]
  spec.email       = ["busko.bogdan@gmail.com"]
  spec.homepage    = "https://github.com/BogdanBusko/awesome_tooltip"
  spec.summary     = "AwesomeTooltip."
  spec.description = "AwesomeTooltip"
  spec.license     = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata["allowed_push_host"] = "https://github.com/BogdanBusko/awesome_tooltip"
  else
    raise "RubyGems 2.0 or newer is required to protect against " \
      "public gem pushes."
  end

  spec.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  spec.add_dependency "rails"
  spec.add_dependency "sass-rails"

  spec.add_development_dependency "sqlite3"
  spec.add_development_dependency "turbolinks"
  spec.add_development_dependency "pry"
end
