# AwesomeTooltip
[![Build Status](https://travis-ci.com/BogdanBusko/awesome_tooltip.svg?branch=master)](https://travis-ci.com/BogdanBusko/awesome_tooltip)
[![Maintainability](https://api.codeclimate.com/v1/badges/13a8f6106b17b50e9943/maintainability)](https://codeclimate.com/github/BogdanBusko/awesome_tooltip/maintainability)

Lightwere get for loading tooltips on your page without preloading this data on page. With this gem you can load static template and templates with data from database.

## Installation
Add this line to your application's Gemfile:

```ruby
gem 'awesome_tooltip'
```

And then execute:
```bash
$ bundle
```

Or install it yourself as:
```bash
$ gem install awesome_tooltip
```

## Configuration

Mount AwesomeTooltip routes in to your config/routes.rb
```ruby
mount AwesomeTooltip::Engine => '/', as: 'awesome_tooltip'
```

Require AwesomeTooltip javascript in to your application.js
```javascript
//= require awesome_tooltip/tootlip
```

If you are using Rails 6 with webpack you must create folder javascripts with file application.js in your assets folder and require javascript there.

Require AwesomeTooltip styles
```css
/*
 *= require awesome_tooltip/tooltip
 */
```

Create folder for you tooltip templates
```bash
$ mkdir app/awesome_tooltips
```

And now just add template.
```bash
$ touch app/awesome_tooltips/template.html.erb
```

Also you can update js configurations
```javascript
AwesomeTooltip({
  tooltipPath: '/your/custom/path/',
  delay: 2000,
  location: 'bottom'
});
```

| Option | Default value | Type |
|--------|---------------|------|
| tooltipPath | /tooltip/ | String |
| delay | 1500 | Integer |
| location | top(also available bottom) | String | 

## Usage

To start using AwesomeTooltip add following attributes to HTML element 
```html
<div class="awesome_tooltip" 
     data-template="user_template"
     data-object="user-1"
     data-loacation="bottom">John Doe</div>
```

Also you can use static templates

| Option | Description | Value example | Optional |
|--------|-------------|---------------|----------|
| data-template | Path to your template(root dir for template is app/awesome_tooltips) | project | false |
| data-object | Model name and object id separated by dash | project-1 | true |
| data-location | Tooltip location | bottom | true |

## TODO:
  - Add generators
  - Add configs
  - Add ability to place tooltip on the left and right side

## Contributing
Contribution directions go here.

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
