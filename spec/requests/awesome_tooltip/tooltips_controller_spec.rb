require 'rails_helper'

RSpec.describe AwesomeTooltip::TooltipsController, type: :request do
  describe 'GET #show' do
    let!(:data) { { template: 'test_template'} }
    let!(:token) { AwesomeTooltip::Tooltip.generate_token(**data)}

    context 'when it is static template' do
      it 'is successful' do
        get awesome_tooltip_url, params: { token: token }
      end
    end
  end
end
