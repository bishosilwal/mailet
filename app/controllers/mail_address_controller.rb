class MailAddressController < ApplicationController

  def create
    render json: { new_mail: 'temp_mail@generatemail.com', status: :ok }
  end

  def destroy
    render json: { message: 'Mail address deleted', new_mail: 'newMail@generatemail.com', details: '', status: :ok }
  end

  def change
    render json: { message: 'Mail address changed', new_mail: 'changedMail@generatemail.com', status: :ok }
  end

  private

  def mail_address_params
    params.require(:mail_address).permit(:mail)
  end
end
