import React from 'react';
import {RNCamera} from 'react-native-camera';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

import styles from './styles';

const {FlashMode: CameraFlashModes, Type: CameraTypes} = RNCamera.Constants;

const Toolbar = (props) => {
 
  // capturing = false
  // cameraType = CameraTypes.back
  // flashMode = CameraFlashModes.off
  // setFlashMode,
  // setCameraType,
  // onCaptureIn,
  // onCaptureOut,
  // onLongCapture,
  // onShortCapture;

  return (
    <View style={styles.bottomToolbar}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={styles.alignCenter}>
          <TouchableOpacity
            onPress={() =>
              props.setFlashMode(
                props.flashMode === CameraFlashModes.on
                  ? CameraFlashModes.off
                  : CameraFlashModes.on,
              )
            }>
            <Image source={require('../../../asessts/images/camera.png')} />
            {/* <Ionicons
            name={
              flashMode == CameraFlashModes.on ? 'md-flash' : 'md-flash-off'
            }
            color="white"
            size={30}
          /> */}
          </TouchableOpacity>
        </View>
        <View style={styles.alignCenter}>
          <TouchableWithoutFeedback
            onPressIn={props.onCaptureIn}
            onPressOut={props.onCaptureOut}
            onLongPress={props.onLongCapture}
            onPress={props.onShortCapture}>
            <View
              style={[
                styles.captureBtn,
                props.capturing && styles.captureBtnActive,
              ]}>
              {props.capturing && <View style={styles.captureBtnInternal} />}
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.alignCenter}>
          <TouchableOpacity
            onPress={() =>
              props.setCameraType(
                props.cameraType === CameraTypes.back
                  ? CameraTypes.front
                  : CameraTypes.back,
              )
            }>
            <Image source={require('../../../asessts/images/camera.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Toolbar;
