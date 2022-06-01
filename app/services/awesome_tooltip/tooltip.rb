require 'jwt'

class AwesomeTooltip::Tooltip
  class << self
    ALGORITHM = 'HS256'

    def generate_token(template:, object: nil, object_id: nil)
      raise AwesomeTooltip::Errors::MissingTemplateError unless template.present?

      data = { template: template }

      if (object.present? && object_id.present?) || (object.nil? && object_id.nil?)
        data.merge!({ object: object, object_id: object_id })
      else
        raise AwesomeTooltip::Errors::MissingParameterError
      end

      JWT.encode(data, nil, ALGORITHM)
    end

    def get_token_data(token)
      raise AwesomeTooltip::Errors::MissingTokenError unless token.present?

      JWT.decode(token, nil, false, { algorithm: ALGORITHM })[0].symbolize_keys
    end
  end
end
