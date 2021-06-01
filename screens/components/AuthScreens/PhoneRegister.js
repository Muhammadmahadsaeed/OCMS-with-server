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
  ToastAndroid,
  Platform,
  AlertIOS,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import font from '../../constants/font';
import colors from '../../constants/colors';
import ImagePicker from 'react-native-image-crop-picker';
import {api} from '../../config/env';
import {connect, useDispatch} from 'react-redux';
const PhoneRegister = (navigation) => {
  const [userName, setUserName] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [imgUri, setImgUri] = useState('');
  const [errortext, setErrortext] = useState('');
  const [userImage, setUserImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [nameEmptyErorr, setNameEmptyErorr] = useState(false);
  const dispatch = useDispatch();
  const mapDispatchToProps = (value) => {
    dispatch({type: 'SET_USER', payload: value});
  };
  const handleSubmitButton = () => {
    const user = navigation.navigation.getParam('user');
    const mobileNo = user.data.user.mobileNo;
    if (!userName) {
      setNameEmptyErorr(true);
    } else {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('userName', userName);
      formdata.append('profile', userImage);
      formdata.append('mobileNo', mobileNo);
      fetch(`${api}public`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setLoading(false);
          user.data.user = responseJson.data.user;
          mapDispatchToProps(user.data);
          navigation.navigation.navigate('Success');
        })
        .catch((error) => {
          //Hide Loader
          setLoading(false);
          console.error(error);
        });
    }
  };

  const setTermAndCondition = () => {
    setAgree(!agree);
  };

  const launchImageLibrary = async () => {
    if (fileUri) {
      setFileUri('');
      setImgUri('');
    } else {
      ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: false,
        includeBase64: true,
        width: 300,
        height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
      })
        .then((response) => {
          let base64 = `data:${response.mime};base64,${response.data}`;
          setImgUri(base64);
          setFileUri(response.path);
          const imageName = response.path.split('/').pop();
          let img = {
            name: imageName,
            type: response.mime,
            uri:
              Platform.OS === 'android'
                ? response.path
                : response.path.replace('file://', ''),
          };
          setUserImage(img);
        })
        .catch((err) => console.log(err));
    }
  };
  const renderFileUri = () => {
    if (fileUri) {
      return <Image source={{uri: fileUri}} style={styles.imageIconStyle} />;
    } else {
      return (
        <Image
          source={require('../../../asessts/images/admin.png')}
          style={styles.imageIconStyle}
        />
      );
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
                      : require('../../../asessts/images/pencl.png')
                  }
                />
              </TouchableOpacity>
              {renderFileUri()}
            </View>
          </View>
          <View style={styles.headingView}>
            <Text style={styles.heading}>Create an account</Text>
            <Text style={styles.para}>Enter your credentials</Text>
          </View>
        </View>
        <View style={styles.form}>
          <KeyboardAvoidingView enabled>
            <View style={[styles.SectionStyle, {marginTop: 40}]}>
              <View style={styles.iconLeft}>
                <Image
                  source={require('../../../asessts/images/user-icon.png')}
                  style={styles.iconLeftImage}
                />
              </View>

              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => setUserName(text)}
                underlineColorAndroid="#f000"
                placeholder="Enter your username"
                placeholderTextColor={colors.Colors.gray}
                autoCapitalize="sentences"
                returnKeyType="next"
                onFocus={() => {
                  setLoading(false);
                  setNameEmptyErorr(false);
                }}
                blurOnSubmit={false}
              />
              {nameEmptyErorr && (
                <View style={styles.iconRight}>
                  <Image
                    source={require('../../../asessts/images/invalidIcon.png')}
                    style={styles.iconRightImage}
                  />
                </View>
              )}
            </View>

            <View style={styles.textView}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{padding: 10}}
                onPress={() => setTermAndCondition()}>
                <Image
                  style={{height: 20, width: 20}}
                  source={
                    agree
                      ? require('../../../asessts/images/Icon-check-circle.png')
                      : require('../../../asessts/images/check-circle.png')
                  }
                />
              </TouchableOpacity>
              <Text style={styles.termText}>
                I agree to the terms of use and privacy policy
              </Text>
            </View>

            <LinearGradient
              colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
              style={styles.linearButton}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmitButton}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.buttonText}>Register</Text>
                )}
              </TouchableOpacity>
            </LinearGradient>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
export default PhoneRegister;

const styles = StyleSheet.create({
  linear: {
    flex: 1,
  },
  header: {
    flex: 1,
    // height: 250,
    // justifyContent: 'center',
  },
  editBtnSection: {
    height: 30,
    width: 30,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 50,
    alignSelf: 'flex-end',
    position: 'absolute',
    zIndex: 1,
  },
  imageIconStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 100,
  },
  imgView: {
    height: 120,
    width: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 50,
  },
  headingView: {
    paddingVertical: 20,
    marginLeft: 20,
    flexDirection: 'column',
    // justifyContent: 'flex-end',
    alignItems: 'baseline',
  },
  heading: {
    color: 'white',
    fontFamily: font.Fonts.josefBold,
    fontSize: 26,
  },
  para: {
    color: 'white',
    fontFamily: font.Fonts.josefReg,
    fontSize: 16,
  },
  form: {
    backgroundColor: '#FBFBFB',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    bottom: 0,
    // height:'70%'
  },
  SectionStyle: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginTop: 5,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#d8d8d8',
    backgroundColor: '#F3F1F1',
  },
  iconLeft: {
    left: 3,
    height: 50,
    width: 25,
    justifyContent: 'center',
    paddingVertical: 4,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  iconRight: {
    position: 'absolute',
    right: 3,
    height: 50,
    width: 35,
    justifyContent: 'center',
    padding: 4,
    alignItems: 'center',
  },
  iconLeftImage: {
    resizeMode: 'contain',
    height: '70%',
    width: '70%',
  },
  iconRightImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    color: 'black',
    borderColor: '#7DE24E',
    height: 50,
    width: '80%',
    alignItems: 'center',
    borderRadius: 30,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonTextStyle: {
    color: '#81b840',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: colors.Colors.gray,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: font.Fonts.josefReg,
    fontSize: 20,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'left',
    fontFamily: font.Fonts.josefReg,
    fontSize: 16,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  linearButton: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 50,
    marginBottom: 40,
  },
  button: {
    marginVertical: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: font.Fonts.josefBold,
    textAlign: 'center',
  },
  errorView: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textView: {
    flex: 1,
    paddingVertical: 10,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  termText: {
    fontFamily: font.Fonts.josefReg,
    fontSize: 16,
    color: '#707070',
    marginLeft: 10,
  },
});
