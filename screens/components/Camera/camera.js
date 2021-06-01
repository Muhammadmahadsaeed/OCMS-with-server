import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Dimensions,
  Image,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Toolbar from './toolbar';
import styles from './styles';
import Gallery from './gallery';
import {dirPicutures} from '../../dir/';
const moment = require('moment');
const RNFS = require('react-native-fs');
let {height, width} = Dimensions.get('window');
let orientation = height > width ? 'Portrait' : 'Landscape';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/colors';
import font from '../../constants/font';
//move the attachment to app folder
const moveAttachment = async (filePath, newFilepath) => {
  return new Promise((resolve, reject) => {
    RNFS.mkdir(dirPicutures)
      .then(() => {
        RNFS.moveFile(filePath, newFilepath)
          .then(() => {
            resolve(newFilepath);
          })
          .catch((error) => {
            console.log('moveFile error', error);
            reject(error);
          });
      })
      .catch((err) => {
        console.log('mkdir error', err);
        reject(err);
      });
  });
};

export default class Camera extends PureComponent {
  state = {
    captures: [],
    capturing: null,
    path: null,
    hasCameraPermission: null,
    cameraType: RNCamera.Constants.Type.back,
    flashMode: RNCamera.Constants.FlashMode.off,
  };

  setFlashMode = (flashMode) => this.setState({flashMode});
  setCameraType = (cameraType) => this.setState({cameraType});
  handleCaptureIn = () => {
    this.setState({capturing: true});
  };

  handleCaptureOut = () => {
    console.log('long press stopp========');
    if (this.state.capturing) this.camera.stopRecording();
  };
  saveImage = async (filePath) => {
    try {
      // set new image name and filepath
      const newImageName = `${moment().format('DDMMYY_HHmmSSS')}.jpg`;
      const newFilepath = `${dirPicutures}/${newImageName}`;
      // move and save image to new filepath
      const imageMoved = await moveAttachment(filePath, newFilepath);
      this.setState({path: 'file:///' + imageMoved});
    } catch (error) {
      console.log(error);
    }
  };
  handleShortCapture = async () => {
    const options = {quality: 0.8, base64: true};
    await this.camera
      .takePictureAsync(options)
      .then((photoData) => {
        this.setState({
          capturing: false,
          captures: [photoData, ...this.state.captures],
        });
        // console.log(photoData.uri)
        this.saveImage(photoData.uri);
      })
      .catch((err) => {
        console.error('capture picture error', err);
      });
  };

  handleLongCapture = async () => {
    const videoData = await this.camera.recordAsync();
    console.log('long press========', videoData);
    this.setState({
      capturing: false,
      captures: [videoData, ...this.state.captures],
    });
  };

  async componentDidMount() {
    const hasCameraPermission = await this.requestCameraPermission();
    if (hasCameraPermission) this.setState({hasCameraPermission});
  }
  requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
  selectImageFromChat = async (uri) => {
    console.log(uri);
    this.setState({path: uri});
    //  this.saveImage(uri)
  };
  renderImage() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.preview}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerImageView}
              onPress={() => this.setState({path: null})}>
              <Image
                source={require('../../../asessts/images/left-arrow.png')}
                style={{height: '100%', width: '100%', resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.imgView}>
            <Image
              source={{uri: this.state.path}}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          <View style={styles.bottomView}>
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={100}
              style={{width: '100%'}}>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  multiline
                  // onChangeText={(text) => setUserName(text)}
                  underlineColorAndroid="#f000"
                  placeholder="Add a caption"
                  // placeholderTextColor={colors.Colors.gray}
                  blurOnSubmit={false}
                />

                <TouchableOpacity 
                  style={styles.btn}
                  activeOpacity={0.9}
                  onPress={() => this.props.navigation.navigate('contact')}>
                    
                  <Image style={{height:120,width:120}}
                    source={require('../../../asessts/images/plus-icon.png')}
                  />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  renderCamera() {
    const {flashMode, cameraType, capturing, captures} = this.state;
    return (
      <View style={{flex: 1}}>
        <RNCamera
          type={cameraType}
          flashMode={flashMode}
          style={styles.preview}
          ref={(camera) => (this.camera = camera)}
        />
        <Gallery selectImageFromChat={this.selectImageFromChat} />

        <Toolbar
          capturing={capturing}
          flashMode={flashMode}
          cameraType={cameraType}
          setFlashMode={this.setFlashMode}
          setCameraType={this.setCameraType}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          onLongCapture={this.handleLongCapture}
          onShortCapture={this.handleShortCapture}
        />
      </View>
    );
  }
  render() {
    const {hasCameraPermission} = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }
    return (
      <SafeAreaView style={{flex: 1}}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
      </SafeAreaView>
    );
  }
}
