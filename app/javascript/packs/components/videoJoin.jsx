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
  localStream: null
};

const peerConnection = window.app.videoCall.peerConnection;
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

class VideoJoin extends Component {
  state = {
    enableCamera: true,
    enableAudio: true,
    stream: null,
    roomId: this.props.videoRoomId,
    roomError: null
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
    window.app.videoCall.subscription.sendVideoOffer(offer);
  }

  async joinRoom(e) {
    const that = this;
    const res = await axios.get('/video_chat/room?room_id=' + this.state.roomId, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token
      }
    });

    if(res.data.room) {
      window.app.videoCall.roomId = this.state.roomId
      window.app.videoCall.subscription = consumer.subscriptions.create({ channel: 'VideoCallChannel', room_id: this.state.roomId},
        {
          async received(data) {
            const peerConnection = window.app.videoCall.peerConnection;
            if(data.answer) {
              await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
            }
          },
          disconnected() {
            console.log('joiner channel disconnected')
          },
          sendIceCandidate(candidate) {
            this.perform('broadcast_candidate', {candidate: candidate, room_id: window.app.videoCall.roomId});
          },
          sendVideoOffer(offer) {
            this.perform('broadcast_offer', {offer: offer, room_id: window.app.videoCall.roomId})
          },
        });
      this.startCall('');
    } else {
      this.setState({roomError: 'Room not found!'})
    }
  }

  stopCall(e) {
    window.app.videoCall.peerConnection.close();
  }

  roomIdChange(e) {
    this.setState({roomId: e.target.value})
  }
  render() {
    const roomId = this.props.videoRoomId;
    return(
      <div className='container video-call'>
        <div className='row mt-5 mb-5'>
          <div className='col-4 border-secondary'>
            <div className='form-group'>
              <label>Enable Camera: </label>
              <input type='checkbox' onClick={e => this.handleCamera(e)} name='cameraCheck'/>
            </div>
            <div className='form-group video-room'>
              <label>Join Room: &nbsp;</label> <br/>
              <input type='text' name='joinRoom' placeholder='Enter room id' value={roomId} onChange={e => this.roomIdChange(e)} className={this.state.roomError ? 'form-control is-invalid' : 'form-control'}/>
              <div className='invalid-feedback'>
                {this.state.roomError}
              </div>
              <button onClick={e => this.joinRoom(e) } className='btn btn-primary d-block btn-sm'>Join</button>
            </div>
            <div className='form-group'>
              <label>Remove Room: </label>
              <button onClick={e => this.stopCall(e) } className='btn btn-primary btm-sm'>Stop</button>
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
const Container = connect(mapStateToProps, mapDispatchToProps)(VideoJoin);

ReactDOM.render(
  <Provider store={window.store}>
    <PersistGate persistor={window.persistor}>
      <Container />
    </PersistGate>
  </Provider>,
  document.getElementById('main-app-body')
)