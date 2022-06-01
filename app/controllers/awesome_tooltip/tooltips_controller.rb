class AwesomeTooltip::TooltipsController < AwesomeTooltip::ApplicationController
  def show
    render partial: template, locals: locals, layout: false
  end

  private

  def data
    @data ||= AwesomeTooltip::Tooltip.get_token_data(params[:token])
  end

  def locals
    return {} unless data[:object].present?

    { object.to_s.downcase => resource }
  end

  def object
    data[:object].classify.contsantize
  end

  def resource
    object.find(data[:object_id])
  end

  def template
    ['tooltips', data[:template]].join('/')
  end
end
