class VideoChatController < ApplicationController
  def new
  end

  def room
    room = VideoRoom.create_random(mail_address: params[:mail_address], slug: params[:room_id])
    render json: { room_id: room.slug }
  end

  def join

  end

  def check_room
    room = VideoRoom.find_by_slug(params[:room_id])
    render json: { room: room }
  end
end
