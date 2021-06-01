// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  ToastAndroid,
  Platform,
  AlertIOS,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import font from '../../constants/font';
import colors from '../../constants/colors';
import ImagePicker from 'react-native-image-crop-picker';
import {connect, useDispatch} from 'react-redux';

const UserProfile = (navigation) => {
  const [fileUri, setfileUri] = useState('');
  const renderFileUri = () => {
    if (fileUri) {
      return <Image source={{uri: fileUri}} style={styles.imageIconStyle} />;
    } else {
      return (
        <Image
          source={require('../../../asessts/images/user-icon-black.png')}
          style={styles.imageIconStyle}
        />
      );
    }
  };
  const launchImageLibrary = async () => {
    if (fileUri) {
      setFileUri('');
      setImgUri('');
    } else {
      ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: false,
        // includeBase64: true,
        width: 300,
        height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
      })
        .then((response) => {
            console.log(response)
        //   let base64 = `data:${response.mime};base64,${response.data}`;
        //   setImgUri(base64);
        //   setFileUri(response.path);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <LinearGradient
      colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.linear}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View style={styles.header}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.imgView}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={launchImageLibrary}
                style={styles.editBtnSection}>
                <Image
                  style={styles.imageIconStyle}
                  source={
                    fileUri
                      ? require('../../../asessts/images/wrong.png')
                      : require('../../../asessts/images/camera-black-icon.png')
                  }
                />
              </TouchableOpacity>
              {renderFileUri()}
            </View>
          </View>
        </View>
        <View style={styles.form}>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.left}>
                <View>
                  <Image
                    source={require('../../../asessts/images/contact-icon.png')}
                  />
                </View>
                <View style={{marginLeft: 15}}>
                  <Text style={styles.heading}>Name</Text>
                  <Text style={styles.para}>Syed Ali Jawwad</Text>
                </View>
              </View>

              <View>
                <TouchableOpacity style={{padding: 10}}>
                  <Image
                    source={require('../../../asessts/images/edit-icon.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.left}>
                <View>
                  <Image source={require('../../../asessts/images/info.png')} />
                </View>
                <View style={{marginLeft: 15}}>
                  <Text style={styles.heading}>About</Text>
                  <Text style={styles.para}>Max up to 250 words.</Text>
                </View>
              </View>

              <View>
                <TouchableOpacity style={{padding: 10}}>
                  <Image
                    source={require('../../../asessts/images/edit-icon.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.left}>
                <View>
                  <Image
                    source={require('../../../asessts/images/call-icon.png')}
                  />
                </View>
                <View style={{marginLeft: 15}}>
                  <Text style={styles.heading}>Phone</Text>
                  <Text style={styles.para}>+923409755265</Text>
                </View>
              </View>

              <View>
                <TouchableOpacity style={{padding: 10}}>
                  <Image
                    source={require('../../../asessts/images/edit-icon.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linear: {
    flex: 1,
  },
  header: {
    flex: 1,
    // justifyContent: 'center',
  },
  imgView: {
    height: 120,
    width: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 50,
  },
  editBtnSection: {
    height: 50,
    width: 50,
    borderColor: '#09c6f9',
    borderWidth: 2,
    borderRadius: 50,
    // alignSelf: 'flex-end',
    bottom: 0,
    right:0,
    alignSelf: 'baseline',
    position: 'absolute',
    zIndex: 1,
  },
  imageIconStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 100,
  },
  form: {
    backgroundColor: '#FBFBFB',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    bottom: 0,
    // height:'70%'
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
  },
  heading: {
    color: '#43AEFF',
    fontFamily: font.Fonts.josefReg,
    fontSize: 16,
  },
  para: {
    color: '#3D3D3D',
    fontFamily: font.Fonts.poppinRegular,
    fontSize: 14,
  },
});

export default UserProfile;
