import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import {connect, Provider} from "react-redux";
import axios from "axios";
import toastr from 'toastr';
import consumer from '../../channels/consumer'
import '../store/configureStore'
window.toastr = toastr;

const token = $("meta[name='csrf-token']").attr('content');

const videoConfig = {
  configuration: {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true
  },
  iceServers: [{'urls': 'stun:stun.l.google.com:19302'}]
};

window.app = {};
window.app.videoCall = {
  subscription: null,
  peerConnection:  new RTCPeerConnection(videoConfig),
  caller: false,
  localStream: null
};

const peerConnection = window.app.videoCall.peerConnection
peerConnection.addEventListener('connectionstatechange', event => {
  if(peerConnection.connectionState === 'connected' ) {
    console.log('peers connected')
  }
});

peerConnection.addEventListener('icecandidate', event => {
  if(event.candidate) {
    window.app.videoCall.subscription.sendIceCandidate(event.candidate);
  }
});

const remoteStream = new MediaStream();

peerConnection.addEventListener('track', async event => {
  remoteStream.addTrack(event.track, remoteStream);
});

class VideoChat extends Component {
  state = {
    enableCamera: true,
    enableAudio: true,
    stream: null
  }

  componentDidMount() {
    const remoteVideo = $('#remote-video');
    remoteVideo[0].srcObject = remoteStream;
  }

  async enableCamera() {
    try {
      const constraints = { 'video': true, 'audio': {'echoCancellation': true} };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const videoElement = document.getElementById('local-video');
      this.setState({stream: stream});
      videoElement.srcObject = stream;
      window.app.videoCall.localStream = stream;
      const peerConnection = window.app.videoCall.peerConnection;
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });
    } catch(error) {
      console.log('Error while opening video camera.', error);
    }
  }

  handleCamera(e) {
    if(e.target.name == 'cameraCheck') {
      if(!this.state.stream) {
        this.enableCamera();
        return;
      }
      this.getVideoTrack().enabled = e.target.checked;
      this.getAudioTrack().enabled = e.target.checked;
      this.setState({ enableCamera: e.target.checked });
    }
  }

  getVideoTrack() {
    return this.state.stream.getVideoTracks()[0];
  }

  getAudioTrack() {
    return this.state.stream.getAudioTracks()[0];
  }

  async startCall(e) {
    const peerConnection = window.app.videoCall.peerConnection;
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    window.app.videoCall.caller = true;
    window.app.videoCall.subscription.sendVideoOffer(offer);
  }

  createRoom(e) {
    const that = this;
    axios.post('/video_chat/room', {
      mail_id: this.props.mail.id
    }, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token
      }
    }).then(function(res) {
      $('.video-room h6').text(res.data.room_id);
      $('.video-room button').remove();
      that.props.videoRoomCreated(res.data.room_id);
      window.app.videoCall.roomId = res.data.room_id;
      window.app.videoCall.subscription = consumer.subscriptions.create({ channel: 'VideoCallChannel', room_id: res.data.room_id},
        {
          async received(data) {
            const peerConnection = window.app.videoCall.peerConnection;
            const caller = window.app.videoCall.caller;
            if(data.offer && !caller) {
              await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
              const answer = await peerConnection.createAnswer();
              await peerConnection.setLocalDescription(answer);
              this.perform('broadcast_answer', {answer: answer, room_id: window.app.videoCall.roomId});
            } else if(data.answer && caller) {
              await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
            } else if(data.candidate && !caller) {
              try {
                await peerConnection.addIceCandidate(data.candidate);
              } catch(e) {
                console.error('Error adding receiving ice candidate.', e)
              }
            }
          },
          disconnected() {
            console.log('channel disconnected')
          },
          sendIceCandidate(candidate) {
            this.perform('broadcast_candidate', {candidate: candidate, room_id: window.app.videoCall.roomId});
          },
          sendVideoOffer(offer) {
            this.perform('broadcast_offer', {offer: offer, room_id: window.app.videoCall.roomId})
          },

        });
    }).catch(function(err){
      console.log(err)
    })
  }

  stopCall(e) {
    window.app.videoCall.peerConnection.close();
  }

  render() {
    return(
      <div className='container video-call'>
        <div className='row mt-5 mb-5'>
          <div className='col-4 border-secondary'>
            <h5>Call Settings</h5>
            <div className='form-group'>
              <label>Enable Camera: </label>
              <input type='checkbox' onClick={e => this.handleCamera(e)} name='cameraCheck'/>
            </div>
            <div className='form-group video-room'>
              <label>Create Room: &nbsp;</label>
              <h6 className='d-inline'></h6>
              <button onClick={e => this.createRoom(e) } className='btn btn-primary'>Start</button>
            </div>
            <div className='form-group'>
              <label>Remove Room: </label>
              <button onClick={e => this.stopCall(e) } className='btn btn-primary'>Stop</button>
            </div>
          </div>
          <div className='col-8'>
            <h6> Your Camera</h6>
            <video id='local-video' height={300} width={600} autoPlay={true} playsInline={true} controls={true}/>
          </div>
          <div className='col-12'>
            <h6> Remote Camera</h6>
            <video id='remote-video' autoPlay={true} playsInline={true} controls={true} className='w-100' />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mail: state.emailReducer.tempMail.mail,
    videoRoomId: state.videoCallReducer.videoCall.roomId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    videoRoomCreated: roomId => dispatch({ type: 'VIDEO_CHAT_ROOM_CREATED', value: roomId})
  }
};
const Container = connect(mapStateToProps, mapDispatchToProps)(VideoChat);

ReactDOM.render(
  <Provider store={window.store}>
    <PersistGate persistor={window.persistor}>
      <Container />
    </PersistGate>
  </Provider>,
  document.getElementById('main-app-body')
)