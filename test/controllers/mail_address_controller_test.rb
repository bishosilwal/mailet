require 'test_helper'

class MailAddressControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get mail_address_create_url
    assert_response :success
  end

  test "should get delete" do
    get mail_address_delete_url
    assert_response :success
  end

end
