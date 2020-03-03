class AwesomeTooltip::TooltipsController < ApplicationController
  include Rails.application.routes.url_helpers

  prepend_view_path(Rails.root.join('app', 'awesome_tooltips'))

  def show
    render template: params[:template], locals: { model => record }, layout: false
  end

  private

  def attrs
    params[:object]&.split('-')
  end

  def model
    attrs[0].classify.constantize
  end

  def record
    model.find(attrs[1]) if params[:object].present?
  end
end
