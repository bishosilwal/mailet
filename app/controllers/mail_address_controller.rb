class MailAddressController < ApplicationController

  def create
    mail = MailAddress.random
    render json: { new_mail: mail, status: :ok }
  end

  def destroy
    mail = MailAddress.random
    render json: { message: 'Mail address deleted', new_mail: mail, details: '', status: :ok }
  end

  def change
    mail = MailAddress.random
    render json: { message: 'Mail address changed', new_mail: mail, status: :ok }
  end

  def custom_address
    mail = MailAddress.new(mail_address_params)
    if mail.save
      render json: {
        message: 'Mail address created',
        new_mail: mail
      }
    else
      render json: mail.errors , status: :unprocessable_entity
    end
  end

  private

  def mail_address_params
    params.require(:mail_address).permit(:mail)
  end
end
