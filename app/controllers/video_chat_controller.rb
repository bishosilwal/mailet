class VideoChatController < ApplicationController
  def new
  end

  def room
    room = VideoRoom.create_random(params[:mail_id])
    render json: { room_id: room.slug }
  end
end
