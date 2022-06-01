require 'rails_helper'

RSpec.describe AwesomeTooltip::Tooltip do
  let!(:subject) { described_class }

  describe '.generate_token' do
    let!(:data) do
      {
        template: '/test_template'
      }
    end

    context 'when params present' do
      it 'encodes data when only template param present' do
        expect { subject.generate_token(**data) }.to_not raise_error
        expect(subject.generate_token(**data)).to_not be_nil
      end

      it 'encodes data when all params present' do
        data.merge!({ object: 'user', object_id: 1 })

        expect { subject.generate_token(**data) }.to_not raise_error
        expect(subject.generate_token(**data)).to_not be_nil
      end
    end

    context 'when some of params missed' do
      it 'raise "AwesomeTooltip::Errors::MissingTemplateError" when param "template" is nil' do
        expect { subject.generate_token(template: nil) }.to raise_error(AwesomeTooltip::Errors::MissingTemplateError)
      end

      it 'raise "AwesomeTooltip::Errors::MissingTemplateError" when param "template" is empty string' do
        expect { subject.generate_token(template: '') }.to raise_error(AwesomeTooltip::Errors::MissingTemplateError)
      end

      it 'raise "AwesomeTooltip::Error::MissingParameterError" when param "object" is nil but "object_id" present' do
        data.merge!({ object_id: 1 })

        expect { subject.generate_token(**data) }.to raise_error(AwesomeTooltip::Errors::MissingParameterError)
      end

      it 'raise "AwesomeTooltip::Error::MissingParameterError" when param "object_id" is nil but "object" present' do
        data.merge!({ object: 'user' })

        expect { subject.generate_token(**data) }.to raise_error(AwesomeTooltip::Errors::MissingParameterError)
      end
    end
  end

  describe '.get_token_data' do
    context 'when token present' do
      let!(:data) do
        {
          template: 'test_template',
          object: 'user',
          object_id: 1
        }
      end
      let!(:token) { subject.generate_token(**data) }

      it 'returns data' do
        expect { subject.get_token_data(token) }.to_not raise_error
        expect(subject.get_token_data(token)).to eq(data)
      end
    end

    context 'when token is not present' do
      it 'raises "AwesomeTooltip::Errors::MissingTokenError" when token is nil' do
        expect { subject.get_token_data(nil) }.to raise_error(AwesomeTooltip::Errors::MissingTokenError)
      end

      it 'raises "AwesomeTooltip::Errors::MissingTokenError" when token is empty string' do
        expect { subject.get_token_data('') }.to raise_error(AwesomeTooltip::Errors::MissingTokenError)
      end
    end
  end
end
