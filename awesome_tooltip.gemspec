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
  spec.summary     = "Server-side tooltips for your Ruby on Rails application with Vanila JS"
  spec.description = "Server-side tooltips for your Ruby on Rails application with Vanila JS"
  spec.license     = "MIT"

  spec.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  spec.required_ruby_version = '>= 2.2.2'

  spec.add_dependency "rails", '>= 5.0.0'
  spec.add_dependency "sass-rails"
  spec.add_dependency "jwt"

  spec.add_development_dependency "sqlite3"
  spec.add_development_dependency "byebug"
  spec.add_development_dependency "rspec-rails"
  spec.add_development_dependency "sprockets"
  spec.add_development_dependency "puma"
end
