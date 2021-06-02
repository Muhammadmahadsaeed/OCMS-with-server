import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Linking,
  PermissionsAndroid,
  Pressable,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import Images from 'react-native-chat-images';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import * as RNFS from 'react-native-fs';
import font from '../../constants/font';
import FileViewer from 'react-native-file-viewer';
import * as AudioManager from './AudioManager';
import {dirDocument} from '../../dir';
import {api} from '../../config/env';
const screenWidth = Dimensions.get('screen').width;
const Conversation = (props) => {
  const [onPressMessage, setOnPressMessage] = useState(false);
  const [playDuration, setPlayDuration] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [currentPositionSec, setCurrentPos] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const audioRecorderPlayer = new AudioRecorderPlayer();
  const [isPause, setIsPause] = useState(true);
  audioRecorderPlayer.setSubscriptionDuration(0.09);

  // componentDidMount() {
  //   Animated.timing(this.animatedValue, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // }
  const isMyMessage = () => {
    const {myId, message} = props;
    return message.userId === myId;
  };

  const onStartPlay = async (url) => {
    const path = Platform.select({
      ios: 'hello.m4a',
      android: url,
    });
    await AudioManager.startPlayer(path, (res) => {
      const {status} = res;
      switch (status) {
        case AudioManager.AUDIO_STATUS.begin: {
          console.log('BEGIN AUDIO');
          setIsPlaying(true);
          break;
        }
        case AudioManager.AUDIO_STATUS.play: {
          const {current_position, duration} = res.data;
          setCurrentPos(current_position);
          setDuration(duration);
          console.log('playing AUDIO');
          // millisToMinutesAndSeconds(current_position);
          break;
        }
        case AudioManager.AUDIO_STATUS.pause: {
          console.log('PAUSE AUDIO');
          setIsPause(true);
          setIsPlaying(false);
          break;
        }

        case AudioManager.AUDIO_STATUS.resume: {
          console.log('RESUME AUDIO');
          setIsPause(false);
          setIsPlaying(true);
          break;
        }

        case AudioManager.AUDIO_STATUS.stop: {
          console.log('STOP AUDIO');
          setIsPlaying(false);
          setIsPause(false);
          break;
        }
      }
    });
  };

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    let time = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    setPlayDuration(time);
  };
  const isMessageType = () => {
    const {message} = props;
    return message.type;
  };
  const openDocument = async (item) => {
    // const url = item.message[0].url;
    const localFile = dirDocument + `/${item.filename}`;
    console.log(localFile);
    // RNFS.readFile(localFile)
    if (localFile) {
      console.log('hai bhai========');
      // FileViewer.open(localFile, {showOpenWithDialog: true})
      //   .then((suc) => console.log('========', suc))
      //   .catch((err) => console.log('====', err));
    } else {
      console.log('nahi h=====');
    }
    // else {
    //   const options = {
    //     fromUrl: url,
    //     toFile: localFile,
    //     begin: _downloadFileBegin,
    //     progress: _downloadFileProgress,
    //     background: false,
    //     progressDivider: 1,
    //   };
    //   RNFS.downloadFile(options)
    //     .promise.then(() => FileViewer.open(localFile))
    //     .then(() => {
    //       console.log('======');
    //       // success
    //     })
    //     .catch((error) => {
    //       // error
    //     });
    // }
  };
  const _downloadFileBegin = () => {
    console.log('Download Begin');
  };

  const _downloadFileProgress = (data) => {
    const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
    setDownloadProgress(percentage);
    const text = `Progress ${percentage}%`;
    console.log('=======', text);
    // if(percentage == 100) //call another function here
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

  const downloadDocument = (item) => {
    const url = item.message[0].url;
    const localFile = `${dirDocument}/${item.filename}`;
    const options = {
      fromUrl: url,
      toFile: localFile,
      begin: _downloadFileBegin,
      progress: _downloadFileProgress,
      background: false,
      progressDivider: 1,
    };
    RNFS.downloadFile(options)
      .promise.then(() => {
        fetch(`${api}message/public/isDownload`, {
          method: 'POST',
          body: {
            messageId: item._id,
            isDownload: true,
          },
        })
          .then((responseJson) => responseJson.json())
          .then((res) => console.log(res))
          .catch((error) => {
            // error
          });
      })
      .catch((error) => {
        // error
      });
  };
  const audioDurationMiliToSec = () => {
    const {message} = props;
    const millis = message.recordDuration;
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    let time = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    return time;
  };

  const pauseAudio = async () => {
    await AudioManager.pausePlayer();
    setIsPause(true);
    setIsPlaying(false);
  };
  const {message, index} = props;
  let playWidth = (currentPositionSec / duration) * screenWidth - 56;
  if (!playWidth) {
    playWidth = 0;
  }
  return (
    <View>
      <View
        style={
          onPressMessage
            ? {backgroundColor: 'green', margin: 2}
            : {backgroundColor: 'transparent', margin: 2}
        }>
        <TouchableOpacity
          activeOpacity={0.9}
          onLongPress={() => onSelectMsg(message)}
          onPress={() => removeSelectMsg(message)}
          style={[
            styles.messageBox,
            {
              backgroundColor: isMyMessage() ? '#00EBCF' : '#44D1FC',
              marginLeft: isMyMessage() ? 50 : 0,
              marginRight: isMyMessage() ? 0 : 50,
              marginVertical: isMyMessage() ? 5 : 5,
            },
          ]}>
          {isMessageType() == 'text' && (
            <View>
              <Text style={styles.message}>{message.messageText}</Text>
              <Text style={styles.time}>11:45</Text>
            </View>
          )}
          {isMessageType() == 'image' && (
            <View style={{flex: 1}}>
              <Images images={message.message} />
            </View>
          )}
          {isMessageType() == 'document' && (
            <View>
              <View style={styles.docView}>
                <TouchableOpacity
                  style={{flex: 1}}
                  activeOpacity={0.8}
                  onPress={() => openDocument(message)}>
                  <View style={styles.documentView}>
                    <Image
                      source={require('../../../asessts/images/pdf.png')}
                      style={{height: 50, width: 50}}
                    />
                    <Text numberOfLines={1} style={styles.documentText}>
                      {message.filename}
                    </Text>
                  </View>
                </TouchableOpacity>
                {!message.isDownload && (
                  <TouchableOpacity
                    style={{padding: 5}}
                    activeOpacity={0.9}
                    onPress={() => downloadDocument(message)}>
                    <Image
                      source={require('../../../asessts/images/download-icon.png')}
                      style={{height: 30, width: 30}}
                    />
                  </TouchableOpacity>
                )}
                {!!downloadProgress && <Text>{downloadProgress}</Text>}
                {/* {downloadProgress && <Text>download</Text>} */}
              </View>
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}> */}
              <Text style={styles.time}>11:45</Text>
              {/* </View> */}
            </View>
          )}
          {isMessageType() == 'audio' && (
            <View style={{flex: 1}}>
              <View style={styles.audioView}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    isPlaying
                      ? pauseAudio()
                      : onStartPlay(message.message[0].url)
                  }
                  style={{width: 35, height: 35}}>
                  <Image
                    source={
                      isPlaying
                        ? require('../../../asessts/images/pause.png')
                        : require('../../../asessts/images/play.png')
                    }
                    style={{height: '100%', width: '100%'}}
                  />
                </TouchableOpacity>
                <View style={styles.viewBarWrapper}>
                  <View style={styles.viewBar}>
                    <View style={[styles.viewBarPlay, {width: playWidth}]} />
                  </View>
                </View>
              </View>
              <View style={styles.audioView}>
                <Text style={styles.duration}>
                  {currentPositionSec ? playDuration : audioDurationMiliToSec()}
                </Text>
                <Text style={styles.time}>11:45</Text>
              </View>
            </View>
          )}
          {/* {isMessageType() == 'video' && (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text> Video </Text>
            </TouchableOpacity>
          )} */}
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{color: 'white'}}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  messageBox: {
    borderRadius: 5,
    padding: 5,
  },
  name: {
    // color: Colors.light.tint,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontFamily: font.Fonts.josefReg,
    fontSize: 18,
    color:'white'
  },
  time: {
    alignSelf: 'flex-end',
    color: 'grey',
    fontFamily: font.Fonts.josefReg,
    fontSize: 14,
  },
  duration: {
    color: 'grey',
    fontFamily: font.Fonts.josefReg,
    fontSize: 14,
    marginLeft:45
  },
  docView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  documentText: {
    flex: 1,
    fontFamily: font.Fonts.josefReg,
    fontSize: 15,
  },
  audioView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewBarWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
    alignSelf: 'stretch',
  },
  viewBar: {
    backgroundColor: '#ccc',
    height: 4,
    alignSelf: 'stretch',
  },

  viewBarPlay: {
    backgroundColor: 'white',
    height: 4,
    width: 0,
  },
});
