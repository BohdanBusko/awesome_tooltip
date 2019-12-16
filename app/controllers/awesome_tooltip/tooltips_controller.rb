class AwesomeTooltip::TooltipsController < ApplicaitonController
  def show
    object = nil

    if params[:object]
      splited_object = params[:object].split('-')
      object = splited_object.first.classify.costantize.find(splited_object.last) if params[:object]
    end

    render(file: Rails.root.join('app', 'awesome_tooltip', params[:template]), locals: { object: object })
  end
end
