# AwesomeTooltip
[![Build Status](https://travis-ci.com/BogdanBusko/awesome_tooltip.svg?branch=master)](https://travis-ci.com/BogdanBusko/awesome_tooltip)
[![Maintainability](https://api.codeclimate.com/v1/badges/13a8f6106b17b50e9943/maintainability)](https://codeclimate.com/github/BogdanBusko/awesome_tooltip/maintainability)

TODO: Add description

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

```ruby
mount AwesomeTooltip::Engine => '/', as: 'awesome_tooltip'
```
JS
```javascript
//= require awesome_tooltip/tootlip
```
CSS
```css
/*
 *= require awesome_tooltip/tooltip
 */
```

Create folder
```bash
$ mkdir app/awesome_tooltips
```

Create template
```bash
$ touch app/awesome_tooltips/template.html.erb
```

## Usage

```html
<div class="awesome_tooltip" data-template="template">Static template</div>
```
or
```html
<div class="awesome_tooltip" 
     data-template="template" 
     data-object="template-1" 
     data-location="bottom">
  Template
</div>
```

| Option | Description | Value example | Optional |
|--------|-------------|---------------|----------|
| data-template | Path to your template(root dir for template is app/awesome_tooltips) | project | false |
| data-object | Model name and object id separated by dash | project-1 | true |
| data-location | Tooltip location | bottom | true |

## Configuration
In JS
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


## Contributing
Contribution directions go here.

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
