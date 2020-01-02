class AwesomeTooltip::TooltipsController < ApplicationController
  def show
    render(file: Rails.root.join('app', 'awesome_tooltips', params[:template]), locals: { object: record })
  end

  private

  def attrs
    params[:object].split('-')
  end

  def model
    attrs[0].classify.constantize
  end

  def record
    model.find(attrs[1])
  end
end
