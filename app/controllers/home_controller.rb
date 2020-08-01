class HomeController < ApplicationController
  def index
  end

  def download_pdf
    message = Message.find(params[:id])
    pdf = WickedPdf.new.pdf_from_string(message.body)
    # then save to a file
    save_path = Rails.root.join('public/pdfs',"email-pdf-#{message.from}-#{message.id}.pdf")
    file = File.open(save_path, 'wb') do |file|
      file << pdf
    end
    file_name = File.basename(file.path)
    render json: {file: file_name}
  end
end
