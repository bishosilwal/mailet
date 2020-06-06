require 'test_helper'

class MailSenderControllerTest < ActionDispatch::IntegrationTest
  test "should get send_mail" do
    get mail_sender_send_mail_url
    assert_response :success
  end

end
