class VideoCallChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'video_call'
  end

  def unsubscribed
  end

  def broadcast_offer(data)
    ActionCable.server.broadcast('video_call', { offer: data['offer'] })
  end

  def broadcast_answer(data)
    ActionCable.server.broadcast('video_call', { answer: data['answer'] })
  end

  def broadcast_candidate(data)
    ActionCable.server.broadcast('video_call', { candidate: data['candidate'] })
  end
end