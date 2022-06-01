module AwesomeTooltip::Helpers
  extend ActiveSupport::Concern

  def tooltip(template:, object: nil, object_id: nil, text: '', classes: '', location: 'top', tooltip_tag: :span)
    params = {
      class: [classes.strip, 'awesome-tooltip'].join(' '),
      data: {
        tooltip: token(template, object, object_id),
        'tooltip-id': SecureRandom.hex(10),
        'tooltip-location': location
      }
    }

    content_tag(tooltip_tag, params) do
      block_given? ? yield : text
    end
  end

  private

  def token(template, object, object_id)
    AwesomeTooltip::Tooltip.generate_token(
      template: template,
      object: object,
      object_id: object_id
    )
  end
end
