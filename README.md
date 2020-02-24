# AwesomeTooltip
[![Build Status](https://travis-ci.com/BogdanBusko/awesome_tooltip.svg?branch=master)](https://travis-ci.com/BogdanBusko/awesome_tooltip)
[![Maintainability](https://api.codeclimate.com/v1/badges/13a8f6106b17b50e9943/maintainability)](https://codeclimate.com/github/BogdanBusko/awesome_tooltip/maintainability)

Lightweight gem for loading tooltips on your page without preloading. With this gem you can load static template, or templates with data from the database.

## Installation
Add this line to your applications' `Gemfile`:

```ruby
gem 'awesome_tooltip'
```

And then execute:
```bash
$ bundle
```

## Configuration

1. Mount AwesomeTooltip routes in to your `config/routes.rb`
```ruby
mount AwesomeTooltip::Engine => '/', as: 'awesome_tooltip'
```

2. Require AwesomeTooltip javascript in to your `application.js`. If you are using Rails 6 with webpack you must create `app/assets/javascripts` folder with `application.js` file and require javascript there.
```javascript
//= require awesome_tooltip/tooltip
```

3. Require AwesomeTooltip styles:
```css
/*
 *= require awesome_tooltip/tooltip
 */
```

4. Create a folder for you tooltip templates:
```bash
$ mkdir app/awesome_tooltips
```

5. Add a template:
```bash
$ echo '<h1>This is your tooltip with static template</h1>' > app/awesome_tooltips/template.html.erb
```

6. Add following code to your page:
```html
<div class="awesome_tooltip" data-template="template">Element with tooltip</div>
```

## Usage
For example, if you want a tooltip with some external info for a user, you can create a tooltip template with the following info in `app/awesome_tooltips/user_info.html.erb` folder: 
```html
<div class="user-info">
  <div class="user-fullname">
    <%= @user.full_name %>
  </div>
  <div class="email">
    <%= @user.email %>
  </div>
</div>
``` 

Then add the following code to your page:
```html
<div class="awesome_tooltip" data-template="user_info" data-object="#{@user.class.name.downcase}-#{@user.id}"><%= @user.full_name %></div>
```

## Configuration
**HTML attributes**
| Option | Description | Value example | Optional |
|--------|-------------|---------------|----------|
| **data-template** | Path to your template(root dir for template is app/awesome_tooltips) | project | false |
| **data-object** | Model name and object id separated by dash | project-1 | true |
| **data-location** | Tooltip location | bottom | true |

If you want to override default javascript configuration, you can add the following code to you js file:
```javascript
AwesomeTooltip({
  tooltipPath: '/your/custom/path/',
  delay: 2000,
  location: 'bottom'
});
```

| Option | Default value | Type |
|--------|---------------|------|
| **tooltipPath** | /tooltip/ | String |
| **hideDelay** | 1500 | Integer |
| **location** | top(also available bottom) | String | 

## TODO:
  - Add generators
  - Add configs
  - Add ability to place tooltip on the left and right side

## Contributing
Contribution directions go here.

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
