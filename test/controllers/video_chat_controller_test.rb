require 'test_helper'

class VideoChatControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get video_chat_new_url
    assert_response :success
  end

end
