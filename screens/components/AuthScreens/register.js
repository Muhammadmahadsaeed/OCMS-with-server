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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import font from '../../constants/font';
import colors from '../../constants/colors';
import ImagePicker from 'react-native-image-crop-picker';
import {api} from '../../config/env';

const RegisterScreen = (navigation) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [imgUri, setImgUri] = useState('');
  const [errortext, setErrortext] = useState('');

  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const [nameEmptyErorr, setNameEmptyErorr] = useState(false);
  const [emailEmptyErorr, setEmailEmptyErorr] = useState(false);
  const [companyEmptyErorr, setCompanyEmptyErorr] = useState(false);
  const [pwdEmptyErorr, setpwdEmptyErorr] = useState(false);
  const [confirmPwdEmptyErorr, setconfirmPwdEmptyErorr] = useState(false);
  const [isEmailWrong, setIsEmailWrong] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  const [showPasswordNotMatch, setShowPasswordNotMatch] = useState(false);

  const userNameInputRef = createRef();
  const emailInputRef = createRef();
  const companyInputRef = createRef();
  const passwordInputRef = createRef();
  const confirmPasswordInputRef = createRef();

  const handleSubmitButton = () => {
    if (
      !userName &&
      !userEmail &&
      !companyName &&
      !userPassword &&
      !userConfirmPassword
    ) {
      setNameEmptyErorr(true);
      setEmailEmptyErorr(true);
      setCompanyEmptyErorr(true);
      setpwdEmptyErorr(true);
      setconfirmPwdEmptyErorr(true);
      setIsEmailCorrect(false);
      setIsEmailWrong(false);
    } else if (!userName) {
      setNameEmptyErorr(true);
      return;
    } else if (!userEmail) {
      setIsEmailCorrect(false);
      setIsEmailWrong(false);
      setEmailEmptyErorr(true);
      return;
    } else if (!companyName) {
      setCompanyEmptyErorr(true);
      return;
    } else if (!userPassword) {
      setpwdEmptyErorr(true);
      return;
    } else if (!userConfirmPassword) {
      setconfirmPwdEmptyErorr(true);
      return;
    } else {
      const msg = 'Please check your email';
      setLoading(true);
      const user = {
        userName: userName,
        email: userEmail,
        profile: imgUri,
        password: userPassword,
        loginCompany: companyName,
      };
      fetch(`${api}user/`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Hide Loader
          setLoading(false);
          if (responseJson.status == '1') {
            if (Platform.OS === 'android') {
              ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
              navigation.navigation.navigate('EmailOtp', {email: userEmail});
            } else {
              AlertIOS.alert(msg);
            }
            setErrortext('');
            console.log('Registration Successful. Please Login to proceed');
          } else {
            setErrortext(responseJson.data[0].msg || responseJson.message);
          }
        })
        .catch((error) => {
          //Hide Loader
          setLoading(false);
          console.error(error);
        });
    }
  };
  const checkPassword = (e) => {
    if (userPassword === e) {
      setPasswordConfirmed(true);
      setShowPasswordNotMatch(false);
      setUserConfirmPassword(e);
    } else {
      setPasswordConfirmed(false);
      setShowPasswordNotMatch(true);
    }
  };
  const setTermAndCondition = () => {
    setAgree(!agree);
  };
  const setPasswordVisibale = () => {
    setHidePassword(!hidePassword);
  };
  const setConfirmPasswordVisibale = () => {
    setHideConfirmPassword(!hideConfirmPassword);
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
  const validate = (text) => {
    let email = text.toLowerCase();
    email = email.trim();
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      setIsEmailCorrect(false);
      setIsEmailWrong(true);
      setEmailEmptyErorr(false);
      return false;
    } else {
      setIsEmailCorrect(true);
      setIsEmailWrong(false);
      setEmailEmptyErorr(false);
      setUserEmail(email);
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
                  setNameEmptyErorr(false);
                }}
                onSubmitEditing={() =>
                  emailInputRef.current && emailInputRef.current.focus()
                }
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
            <View style={styles.SectionStyle}>
              <View style={styles.iconLeft}>
                <Image
                  source={require('../../../asessts/images/email-icon.png')}
                  style={styles.iconLeftImage}
                />
              </View>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => validate(text)}
                // onChangeText={(text) => setUserEmail(text)}
                underlineColorAndroid="#f000"
                placeholder="Enter your email"
                placeholderTextColor={colors.Colors.gray}
                keyboardType="email-address"
                ref={emailInputRef}
                returnKeyType="next"
                onFocus={() => {
                  setEmailEmptyErorr(false);
                }}
                onSubmitEditing={() =>
                  companyInputRef.current && companyInputRef.current.focus()
                }
                blurOnSubmit={false}
              />

              <View style={styles.iconRight}>
                {isEmailWrong && (
                  <Image
                    source={require('../../../asessts/images/wrong.png')}
                    style={styles.iconRightImage}
                  />
                )}
                {isEmailCorrect && (
                  <Image
                    source={require('../../../asessts/images/correct.png')}
                    style={styles.iconRightImage}
                  />
                )}
                {emailEmptyErorr && (
                  <Image
                    source={require('../../../asessts/images/invalidIcon.png')}
                    style={styles.iconRightImage}
                  />
                )}
              </View>
            </View>
            <View style={styles.SectionStyle}>
              <View style={styles.iconLeft}>
                <Image
                  source={require('../../../asessts/images/organization-icon.png')}
                  style={styles.iconLeftImage}
                />
              </View>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => setCompanyName(text)}
                underlineColorAndroid="#f000"
                placeholder="Enter your company name"
                placeholderTextColor={colors.Colors.gray}
                keyboardType="default"
                ref={companyInputRef}
                returnKeyType="next"
                onFocus={() => {
                  setCompanyEmptyErorr(false);
                }}
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
              {companyEmptyErorr && (
                <View style={styles.iconRight}>
                  <Image
                    source={require('../../../asessts/images/invalidIcon.png')}
                    style={styles.iconRightImage}
                  />
                </View>
              )}
            </View>
            <View style={styles.SectionStyle}>
              <View style={styles.iconLeft}>
                <Image
                  source={require('../../../asessts/images/pwd-icon.png')}
                  style={styles.iconLeftImage}
                />
              </View>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => setUserPassword(text)}
                underlineColorAndroid="#f000"
                placeholder="Enter password"
                placeholderTextColor={colors.Colors.gray}
                ref={passwordInputRef}
                returnKeyType="next"
                onFocus={() => {
                  setpwdEmptyErorr(false);
                }}
                secureTextEntry={hidePassword}
                onSubmitEditing={() =>
                  confirmPasswordInputRef.current &&
                  confirmPasswordInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
              <View style={styles.iconRight}>
                {pwdEmptyErorr ? (
                  <Image
                    source={require('../../../asessts/images/invalidIcon.png')}
                    style={styles.iconRightImage}
                  />
                ) : (
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 3,
                      height: 45,
                      width: 35,
                      justifyContent: 'center',
                      padding: 4,
                      alignItems: 'center',
                    }}
                    activeOpacity={0.8}
                    onPress={() => {
                      setPasswordVisibale();
                    }}>
                    <Image
                      source={
                        hidePassword
                          ? require('../../../asessts/images/greenhide.png')
                          : require('../../../asessts/images/greenview.png')
                      }
                      style={styles.iconRightImage}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.SectionStyle}>
              <View style={styles.iconLeft}>
                <Image
                  source={require('../../../asessts/images/confirm-pwd-icon.png')}
                  style={styles.iconLeftImage}
                />
              </View>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(e) => checkPassword(e)}
                // onChangeText={(text) => setUserConfirmPassword(text)}
                underlineColorAndroid="#f000"
                placeholder="Enter confirm password"
                placeholderTextColor={colors.Colors.gray}
                ref={confirmPasswordInputRef}
                returnKeyType="next"
                onFocus={() => {
                  setconfirmPwdEmptyErorr(false);
                }}
                secureTextEntry={hideConfirmPassword}
                blurOnSubmit={false}
              />

              <View style={styles.iconRight}>
                {confirmPwdEmptyErorr ? (
                  <Image
                    source={require('../../../asessts/images/invalidIcon.png')}
                    style={styles.iconRightImage}
                  />
                ) : (
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 3,
                      height: 45,
                      width: 35,
                      justifyContent: 'center',
                      padding: 4,
                      alignItems: 'center',
                    }}
                    activeOpacity={0.8}
                    onPress={() => {
                      setConfirmPasswordVisibale();
                    }}>
                    <Image
                      source={
                        hideConfirmPassword
                          ? require('../../../asessts/images/greenhide.png')
                          : require('../../../asessts/images/greenview.png')
                      }
                      style={styles.iconRightImage}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {passwordConfirmed && (
              <View style={styles.textView}>
                <Text
                  style={{
                    color: 'green',
                    fontFamily: font.Fonts.josefReg,
                  }}>
                  Password match
                </Text>
              </View>
            )}
            {showPasswordNotMatch && (
              <View style={styles.textView}>
                <Text
                  style={{
                    color: 'red',
                    fontFamily: font.Fonts.josefReg,
                  }}>
                  Password does not match
                </Text>
              </View>
            )}

            {errortext != '' ? (
              <View style={styles.errorView}>
                <Text style={styles.errorTextStyle}>{errortext}</Text>
              </View>
            ) : null}
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
export default RegisterScreen;

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
