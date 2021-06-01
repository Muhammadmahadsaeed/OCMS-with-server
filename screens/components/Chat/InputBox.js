import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  PermissionsAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import CryptoJS from 'crypto-js';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import colors from '../../constants/colors';
import font from '../../constants/font';
import RNFetchBlob from 'rn-fetch-blob';
import {dirAudio} from '../../dir/';
class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      message: '',
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '0:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      startAudio: false,
      currentTime: 0,
      recordDuration: 0,
    };
    this.timer = null;
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
  }
  messageIdGenerator() {
    // generates uuid.
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  captureImage = async (type) => {
    // this.props.navigation.navigation.navigate('cameraFromChat')
    ImagePicker.openCamera({
      mediaType: type,
      includeBase64: true,
      useFrontCamera: true,
    })
      .then((res) => {
        // console.log(image);
      })
      .catch((err) => console.log(err));
  };

  onMicrophonePress = () => {
    console.warn('Microphone');
  };
  onSendPress = async () => {
    const {message} = this.state;
    // Encrypt
    // var ciphertext = CryptoJS.AES.encrypt(message, 'secret key 123').toString();
    let messageObj = {
      userId: 1,
      type: 'text',
      message: {
        text: message,
      },
    };
    this.props.getDataFromInput(messageObj);
    this.setState({message: ''});
  };
  componentDidMount() {
    this.checkPermission().then(async (hasPermission) => {
      this.setState({hasPermission});
      if (!hasPermission) return;
    });
  }
  async checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  }
  onPress = () => {
    if (!this.state.message) {
      this.handleAudio();
    } else {
      this.onSendPress();
    }
  };
  handleAudio = () => {
    if (!this.state.startAudio) {
      this.setState({startAudio: true});
      this.onStartRecording();
    } else {
      this.setState({startAudio: false});
      this.onStopRecord();
    }
  };
  onStartRecording = async () => {
    const path = `${dirAudio}/${this.messageIdGenerator()}.acc`;
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
    this.audioRecorderPlayer.addRecordBackListener((e) => {
      this.millisToMinutesAndSeconds(e.current_position);
    });
  };
  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    let time = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    this.setState({recordTime: time, recordDuration: millis});
  }
  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    let arr = [];
    // const fileName = result.replace('file:///', '');
    // RNFetchBlob.fs.readStream(fileName, 'base64', 1048576).then((ifStream) => {
    //   ifStream.open();
    //   ifStream.onData((data) => {
    //     let base64 = `data:audio/mpeg;base64,${data}`;
    //     const param = {
    //       base64: base64,
    //       size: 1048576, // size, in bytes
    //       // type: res.type,
    //       // name: res.name,
    //     };
    const fileName = result.split('/').pop();
    let audioArr = [];
    let audio = {
      name: fileName,
      type: 'audio/acc',
      uri: Platform.OS === 'android' ? result : result.replace('file://', ''),
    };
    audio.recordTime = this.state.recordDuration;
    audioArr.push(audio);
    let messageObj = {
      userId: 2,
      type: 'audio',
      message: {
        // uri: param.base64,
        file: audioArr,
      },
    };
    this.props.getDataFromInput(messageObj);
    this.setState({
      recordSecs: 0,
      recordTime: '0:00',
    });
    //   });
    //   ifStream.onError((err) => {
    //     console.log(err);
    //   });
    // });
  };
  onCancel = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    const fileName = result.split('/').pop();
    this.audioRecorderPlayer.removeRecordBackListener();
    const path = `${dirAudio}/${fileName}`;
    RNFS.unlink(path)
      .then(() => {
        this.setState({
          recordSecs: 0,
          startAudio: false,
          recordTime: '0:00',
        });
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch((err) => {
        console.log(err.message);
      });
  };
  renderAudioRecorder = () => {
    return (
      <View style={styles.audioContainer}>
        <Text style={styles.audioTimerText}>{this.state.recordTime}</Text>
        <TouchableOpacity
          style={{padding: 5}}
          activeOpacity={0.8}
          onPress={this.onCancel}>
          <Text style={styles.cancelText}>cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {message} = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
        style={{width: '100%'}}>
        <View style={styles.container}>
          {this.state.startAudio ? (
            this.renderAudioRecorder()
          ) : (
            <View style={styles.mainContainer}>
              <Image
                source={require('../../../asessts/images/emoji-smile.png')}
                style={styles.icon}
              />

              <TextInput
                ref={this.inputRef}
                placeholder={'Type a message'}
                style={styles.textInput}
                multiline
                value={message}
                onChangeText={(text) => this.setState({message: text})}
              />
              <TouchableOpacity
                style={{padding: 5}}
                onPress={() => this.props.openAttachmentModal()}>
                <Image
                  source={require('../../../asessts/images/attachment-line.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>

              {!message && (
                <TouchableOpacity
                  style={{padding: 5}}
                  onPress={() => this.captureImage('photo')}>
                  <Image
                    source={require('../../../asessts/images/camera-icon.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
          <TouchableOpacity onPress={this.onPress} activeOpacity={0.8}>
            <View style={styles.buttonContainer}>
              {!message ? (
                <Image
                  source={require('../../../asessts/images/voice.png')}
                  style={styles.btnIcon}
                />
              ) : (
                <Image
                  source={require('../../../asessts/images/send-icon.png')}
                  style={styles.btnIcon}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default InputBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  audioContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,

    borderRadius: 50,
    marginRight: 7,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  audioTimerText: {
    color: 'black',
    fontSize: 20,
    // padding: 10,
    fontFamily: font.Fonts.josefBold,
  },
  cancelText: {
    color: 'red',
    fontSize: 16,
    // padding: 12,
    fontFamily: font.Fonts.josefReg,
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 50,
    marginRight: 7,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  btnIcon: {
    marginHorizontal: 5,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
