class MailAddressController < ApplicationController
  after_action :set_address_session

  def create
    @mail = MailAddress.random
    render json: { new_mail: @mail, status: :ok }
  end

  def destroy
    @mail = MailAddress.random(mail_id_params)
    render json: { message: 'Mail address deleted', new_mail: @mail, details: '', status: :ok }
  end

  def change
    @mail = MailAddress.random(mail_id_params)
    render json: { message: 'Mail address changed', new_mail: @mail, status: :ok }
  end

  def custom_address
    @mail = MailAddress.random(**mail_id_params, address: mail_address_params[:mail])
    if @mail.save
      render json: {
        message: 'Mail address created',
        new_mail: @mail
      }
    else
      render json: @mail.errors.messages, status: :unprocessable_entity
    end
  end

  private

  def set_address_session
    if @mail.persisted?
      session.delete(:mail_address)
      session[:mail_address] = @mail.mail
    end
  end

  def mail_address_params
    params.require(:mail_address).permit(:mail)
  end

  def mail_id_params
    { mail_id: params['mail']['id'] }
  end
end
