import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Linking,
  PermissionsAndroid,
} from 'react-native';
import Images from 'react-native-chat-images';
// import Sound from 'react-native-sound';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import Slider from '@react-native-community/slider';
import * as RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import font from '../../constants/font';
import FileViewer from 'react-native-file-viewer';
import * as AudioManager from './AudioManager';
import TrackPlayer, { useTrackPlayerProgress,usePlaybackState } from 'react-native-track-player';

const Conversation = (props) => {
  const [onPressMessage, setOnPressMessage] = useState(false);
  const [playDuration, setPlayDuration] = useState('');
  const [AudioStatus, setAudioStatus] = useState(true)
  const playbackState = usePlaybackState();
  // constructor(props) {
  //   super(props);
  //   this.audioRecorderPlayer = new AudioRecorderPlayer();
  //   this.audioRecorderPlayer.setSubscriptionDuration(0.09);
  //   this.animatedValue = new Animated.Value(0);
  //   this.state = {
  //     message: '',
  //     recordTime: '00:00:00',
  //     currentPositionSec: 0,
  //     currentDurationSec: 0.1,
  //     duration: '00:00:00',
  //     startAudio: false,
  //     AudioStatus: true,
  //     isPause: false,
  //     onPressMessage: false,
  //     playDuration: '',
  //   };
  // }

  // componentDidMount() {
  //   Animated.timing(this.animatedValue, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // }
  const isMyMessage = () => {
    const { myId, message } = props;
    return message.userId === myId;
  };
  const onStartPlay = async (e) => {
    const fileName = e.message.uri.replace('file:///', '');
    TrackPlayer.setupPlayer();
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: 'trackId',
        url: fileName,
        title: 'Track Title',
        artist: 'Track Artist',
      });
      await TrackPlayer.play();
     console.log(playbackState,TrackPlayer.STATE_PAUSED)
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        console.log("play")
        await TrackPlayer.play();
      } else {
        console.log("pause=======")
        await TrackPlayer.pause();
      }
    }
  };

  // onPause = () => {
  //   this.setState({isPlay: false});
  //   TrackPlayer.pause();
  // };
  // onStartPlay = async (e) => {
  //   const fileName = e.message.uri.replace('file:///', '');
  //   const path = Platform.select({
  //     ios: 'hello.m4a',
  //     android: fileName,
  //   });
  //   try {
  //     await AudioManager.startPlayer(path, (res) => {
  //       const {status} = res;
  //       switch (status) {
  //         case AudioManager.AUDIO_STATUS.begin:
  //           this.setState({isPlay: true});
  //           break;
  //         case AudioManager.AUDIO_STATUS.play: {
  //           const {current_position, duration} = res.data;
  //           this.millisToMinutesAndSeconds(current_position);
  //           this.setState({
  //             isPlay: true,
  //             currentPositionSec: current_position,
  //             currentDurationSec: duration,
  //           });
  //           break;
  //         }
  //         case AudioManager.AUDIO_STATUS.pause: {
  //           console.log('PAUSE AUDIO');
  //           // this.setState({isPlay: false});
  //           // this.pauseAudio()
  //           // this.setState({isPause: true});
  //           break;
  //         }
  //         case AudioManager.AUDIO_STATUS.resume: {
  //           console.log('RESUME AUDIO');
  //           // AudioManager.pausePlayer()
  //           // this.setState({isPlay: false});
  //           // this.pauseAudio()
  //           break;
  //         }

  //         case AudioManager.AUDIO_STATUS.stop: {
  //           console.log('STOP AUDIO');
  //           this.setState({isPlay: false});
  //           break;
  //         }
  //       }
  //     });
  //   } catch (e) {
  //     console.log('err======', e);
  //   }
  // };
  // async pauseAudio() {
  //   await AudioManager.pausePlayer()
  // }

  // millisToMinutesAndSeconds(millis) {
  //   var minutes = Math.floor(millis / 60000);
  //   var seconds = ((millis % 60000) / 1000).toFixed(0);
  //   let time = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  //   this.setState({playDuration: time});
  // }
  const isMessageType = () => {
    const { message } = props;
    return message.type;
  };
  const openDocument = async (item) => {
    const AppFolder = 'OCMS';
    const DirectoryPath = RNFS.ExternalStorageDirectoryPath + '/' + AppFolder;
    RNFS.mkdir(DirectoryPath);

    const destPath = `${RNFS.ExternalStorageDirectoryPath}/OCMS/Documents/`;
    await RNFS.copyFile(item.message.fileUri, destPath);

    const fileURL = await RNFS.stat(destPath);
    FileViewer.open(fileURL.path, { showOpenWithDialog: true })
      .then((suc) => console.log(suc))
      .catch((err) => console.log(err));
  };
  const onSelectMsg = (message) => {
    if (onPressMessage === false) {
      toggleSelect();
    }
    props.getSelectedMessage(message);
  };
  const toggleSelect = () => {
    setOnPressMessage(!onPressMessage);
  };
  const removeSelectMsg = () => {
    if (onPressMessage) {
      toggleSelect();
    }
    props.getSelectedMessage(null);
  };
  // componentWillUnmount() {
  //   TrackPlayer.destroy();
  // }
  // render() {
  const { message } = props;
  //   const {playDuration, onPressMessage} = this.state;
  return (
    <View
      style={
        onPressMessage
          ? { backgroundColor: 'green', margin: 2 }
          : { backgroundColor: 'transparent', margin: 2 }
      }>
      <TouchableOpacity
        activeOpacity={0.9}
        onLongPress={() => onSelectMsg(message)}
        onPress={() => removeSelectMsg(message)}
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
            marginLeft: isMyMessage() ? 50 : 0,
            marginRight: isMyMessage() ? 0 : 50,
            marginVertical: isMyMessage() ? 5 : 5,
          },
        ]}>
        {isMessageType() == 'Text' && (
          <View>
            <Text style={styles.message}>{message.message.text}</Text>
            <Text style={styles.time}>11:45</Text>
          </View>
        )}
        {isMessageType() == 'Image' && (
          <View style={{ flex: 1 }}>
            <Images images={message.message.image} />
          </View>
        )}
        {isMessageType() == 'document' && (
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={0.8}
            onPress={() => openDocument(message)}>
            <View style={styles.documentView}>
              <Image
                source={require('../../../asessts/images/pdf.png')}
                style={{ height: 50, width: 50 }}
              />
              <Text numberOfLines={1} style={styles.documentText}>
                {message.message.fileName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.time}>11:45</Text>
              <Text style={styles.time}>11:45</Text>
            </View>
          </TouchableOpacity>
        )}
        {isMessageType() == 'audio' && (
          <View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => onStartPlay(message)}
                style={{ width: 35, height: 35 }}>
                <Image
                  source={
                    AudioStatus
                      ? require('../../../asessts/images/play.png')
                      : require('../../../asessts/images/pause.png')
                  }
                  style={{ height: '100%', width: '100%' }}
                />
              </TouchableOpacity>

              <View style={{ marginLeft: 15, flex: 1 }}>
                <Slider
                  minimumTrackTintColor="#e75480"
                  maximumTrackTintColor="#d3d3d3"
                  thumbTintColor="white" // now the slider and the time will work
                // value={
                //   this.state.currentPositionSec /
                //   this.state.currentDurationSec
                // } // slier input is 0 - 1 only so we want to convert sec to 0 - 1
                // onValueChange={this.onslide}
                />
                <View>
                  <Text style={styles.duration}>
                    {playDuration ? playDuration : message.message.recordTime}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
  // }
};

export default Conversation;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  messageBox: {
    borderRadius: 5,
    padding: 10,
  },
  name: {
    // color: Colors.light.tint,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontFamily: font.Fonts.josefReg,
    fontSize: 18,
  },
  time: {
    alignSelf: 'flex-end',
    color: 'grey',
    fontFamily: font.Fonts.josefReg,
  },
  duration: {
    color: 'grey',
    fontFamily: font.Fonts.josefReg,
  },
  documentView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  documentText: {
    flex: 1,
    fontFamily: font.Fonts.josefReg,
    fontSize: 15,
  },
  progress: {
    height: 1,
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: 'gray',
  },
});
