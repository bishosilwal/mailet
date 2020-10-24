class MailAddressController < ApplicationController
  before_action :check_address_session, only: [:create]
  after_action :set_address_session

  def create
    @mail ||= MailAddress.random
    render json: { new_mail: @mail, status: :ok }
  end

  def destroy
    @mail = MailAddress.random(mail_id_params)
    render json: { message: 'Mail address deleted', new_mail: @mail, details: '', status: :ok }
  end

  def change
  end

  def custom_address
    @mail = MailAddress.random(address: mail_address_params[:mail], mail_id: check_address_session.id)
    if @mail.persisted?
      render json: {
        message: 'Mail address created',
        new_mail: @mail
      }
    else
      render json: @mail.errors.messages, status: :unprocessable_entity
    end
  end

  private

  def check_address_session
    @mail = MailAddress.find_or_create_by(mail: mail_address_session)
  end

  def set_address_session
    if @mail&.persisted?
      session.delete(:mail_address)
      mail_address_session @mail.mail
    end
  end

  def mail_address_params
    params.require(:mail_address).permit(:mail)
  end

  def mail_id_params
    { mail_id: params['mail']['id'] }
  end

  def mail_address_session(address = nil)
    if address.present?
      session[:mail_address] = address
    else
      session[:mail_address]
    end
  end
end
