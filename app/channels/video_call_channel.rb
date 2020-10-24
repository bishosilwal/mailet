class VideoCallChannel < ApplicationCable::Channel
  def subscribed
    stream_from "video_room_#{params[:room_id]}"
  end

  def unsubscribed
  end

  def broadcast_offer(data)
    ActionCable.server.broadcast("video_room_#{data['room_id']}", { offer: data['offer'] })
  end

  def broadcast_answer(data)
    ActionCable.server.broadcast("video_room_#{data['room_id']}", { answer: data['answer'] })
  end

  def broadcast_candidate(data)
    ActionCable.server.broadcast("video_room_#{data['room_id']}", { candidate: data['candidate'] })
  end
end