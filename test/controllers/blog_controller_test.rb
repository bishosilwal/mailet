require 'test_helper'

class BlogControllerTest < ActionDispatch::IntegrationTest
  test "should get tmp_email_description" do
    get blog_tmp_email_description_url
    assert_response :success
  end

end
