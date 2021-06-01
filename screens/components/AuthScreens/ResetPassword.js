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

const ResetPassword = (navigation) => {
  const [otp, setOTP] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [errortext, setErrortext] = useState('');

  const [loading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const [otpEmptyErorr, setotpEmptyErorr] = useState(false);
  const [pwdEmptyErorr, setpwdEmptyErorr] = useState(false);
  const [confirmPwdEmptyErorr, setconfirmPwdEmptyErorr] = useState(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  const [showPasswordNotMatch, setShowPasswordNotMatch] = useState(false);

  const optInputRef = createRef();
  const passwordInputRef = createRef();
  const confirmPasswordInputRef = createRef();

  const handleSubmitButton = () => {
    if (
      !otp &&
      !userPassword &&
      !userConfirmPassword
    ) {
      setpwdEmptyErorr(true);
      setotpEmptyErorr(true);
      setconfirmPwdEmptyErorr(true);
    } else if (!otp) {
      setotpEmptyErorr(true);
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
      setSuccess(true)
      // const user = {
      //   mobileNo: otp,
      //   password: userPassword,
      // };
      // fetch(`${api}user/`, {
      //   method: 'POST',
      //   body: JSON.stringify(user),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // })
      //   .then((response) => response.json())
      //   .then((responseJson) => {
      //     //Hide Loader
      //     setLoading(false);
      //     console.log(responseJson);

      //     if (responseJson.status == '1') {
      //       if (Platform.OS === 'android') {
      //         ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
      //         navigation.navigation.navigate('EmailOtp', {email: userEmail});
      //       } else {
      //         AlertIOS.alert(msg);
      //       }
      //       setErrortext('');
      //       console.log('Registration Successful. Please Login to proceed');
      //     } else {
      //       setErrortext(responseJson.data[0].msg || responseJson.message);
      //     }
      //   })
      //   .catch((error) => {
      //     //Hide Loader
      //     setLoading(false);
      //     console.error(error);
      //   });
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

  const setPasswordVisibale = () => {
    setHidePassword(!hidePassword);
  };
  const setConfirmPasswordVisibale = () => {
    setHideConfirmPassword(!hideConfirmPassword);
  };

  if (isSuccess) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successImg}>
          <Image
            source={require('../../../asessts/images/success.png')}
            style={styles.img}
          />
        </View>
        <View style={styles.successText}>
          <Text style={styles.successTextHeading}>Successful</Text>
          <Text style={styles.successTextPara}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo.
          </Text>
        </View>
        <LinearGradient
          colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[styles.linearButton, {marginTop: 50}]}>
          <TouchableOpacity activeOpacity={0.8}
            style={styles.button}
            onPress={() => navigation.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
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
           <Text>Reset password</Text>
          </View>
          <View style={styles.headingView}>
            <Text style={styles.heading}>Create an account</Text>
            <Text style={styles.para}>Enter your credentials</Text>
          </View>
        </View>
        <View style={styles.form}>
          <KeyboardAvoidingView enabled>
            
            <View style={[styles.SectionStyle,{marginTop:40}]}>
              <View style={styles.iconLeft}>
                <Image
                  source={require('../../../asessts/images/user-icon.png')}
                  style={styles.iconLeftImage}
                />
              </View>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(number) => setOTP(number)}
                underlineColorAndroid="#f000"
                placeholder="Enter your four digit OTP"
                placeholderTextColor={colors.Colors.gray}
                keyboardType="numeric"
                ref={optInputRef}
                maxLength={4}
                returnKeyType="next"
                onFocus={() => {
                  setotpEmptyErorr(false);
                }}
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
              {otpEmptyErorr && (
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
         

            <LinearGradient
              colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
              style={styles.linearButton}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmitButton}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.buttonText}>Submit</Text>
                )}
              </TouchableOpacity>
            </LinearGradient>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
export default ResetPassword;

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
  linearButton: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 50,
    marginVertical: 40,
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
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successImg: {
    height: 200,
    width: 200,
  },
  img: {
    height: '100%',
    width: '100%',
  },
  successText: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  successTextHeading: {
    color: '#43AEFF',
    fontSize: 30,
    fontFamily: font.Fonts.josefLight,
  },
  successTextPara: {
    fontSize: 16,
    color: '#707070',
    fontFamily: font.Fonts.josefReg,
    textAlign: 'center',
  },
  linearBtn: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 50,
    marginBottom: 20,
  },
});
