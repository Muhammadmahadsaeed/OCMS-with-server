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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import font from '../../constants/font';
import colors from '../../constants/colors';
import {api} from '../../config/env';
import {connect, useDispatch} from 'react-redux';

const LoginWithEmail = (navigation) => {
  const dispatch = useDispatch();
  const mapDispatchToProps = (value) => {
    dispatch({type: 'SET_USER', payload: value});
  };

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [errortext, setErrortext] = useState('');
  const [emailEmptyErorr, setEmailEmptyErorr] = useState(false);
  const [pwdEmptyErorr, setPwdEmptyErorr] = useState(false);
  const [isEmailWrong, setIsEmailWrong] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {
    const msg = 'Please verify your email';
    if (!userEmail && !userPassword) {
      setEmailEmptyErorr(true);
      setPwdEmptyErorr(true);
      setIsEmailCorrect(false);
      setIsEmailWrong(false);
      return;
    } else if (!userEmail) {
      setEmailEmptyErorr(true);
      setIsEmailCorrect(false);
      setIsEmailWrong(false);
      return;
    } else if (!userPassword) {
      setPwdEmptyErorr(true);
      return;
    } else {
      setLoading(true);
      let user = {
        email: userEmail,
        password: userPassword,
        loginCompany: '605444a8e2924b2bec69e360',
      };
      fetch(`${api}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setLoading(false);
          if (responseJson.status == '0') {
            //when email is not verified
            if (Platform.OS === 'android') {
              ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
              navigation.navigation.navigate('EmailOtp', {email: userEmail});
            } else {
              AlertIOS.alert(msg);
            }
            setErrortext('');
          } // when email and password incorrect
          else if (responseJson.status == '2') {
            setErrortext('Invalid email and password');
          } else {
            mapDispatchToProps(responseJson.data)
            navigation.navigation.navigate('HomeScreen');
          }
        })
        .catch((error) => {
          //Hide Loader
          setLoading(false);
          console.error(error);
        });
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
  const setPasswordVisibale = () => {
    setHidePassword(!hidePassword);
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
            <View style={styles.imgView}></View>
          </View>
          <View style={styles.headingView}>
            <Text style={styles.heading}>Login your account</Text>
          </View>
        </View>
        <View style={styles.form}>
          <KeyboardAvoidingView enabled>
            <View style={[styles.SectionStyle, {marginTop: 40}]}>
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
                onFocus={
                  () => setEmailEmptyErorr(false)
                  // this.setState({
                  //   isloading: false,
                  //   showEmailEmptyErorr: false,
                  //   showInvalidErorr: false,
                  // })
                }
                returnKeyType="next"
                onSubmitEditing={() =>
                  emailInputRef.current && passwordInputRef.current.focus()
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
                secureTextEntry={hidePassword}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                onFocus={
                  () => setPwdEmptyErorr(false)
                  // this.setState({
                  //   isloading: false,
                  //   showEmailEmptyErorr: false,
                  //   showInvalidErorr: false,
                  // })
                }
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
            {errortext != '' ? (
              <View style={styles.errorView}>
                <Text style={styles.errorTextStyle}>{errortext}</Text>
              </View>
            ) : null}
            <View style={styles.textView}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{padding: 10}}
                onPress={() => navigation.navigation.navigate('ForgotPwd')}>
                <Text style={styles.termText}>Forgot Password?</Text>
              </TouchableOpacity>
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
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
              style={[styles.linearButton, {marginBottom: 40}]}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigation.navigate('Register')}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </LinearGradient>
          </KeyboardAvoidingView>
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

  headingView: {
    paddingVertical: 20,
    marginLeft: 20,
    flexDirection: 'column',
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
  iconLeftImage: {
    resizeMode: 'contain',
    height: '70%',
    width: '70%',
  },
  iconRight: {
    position: 'absolute',
    right: 3,
    height: 45,
    width: 35,
    justifyContent: 'center',
    padding: 4,
    alignItems: 'center',
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
    marginBottom: 20,
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
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  termText: {
    fontFamily: font.Fonts.josefReg,
    fontSize: 18,
    color: colors.Colors.blueLight,
    // marginLeft: 10,
  },
});

export default LoginWithEmail;
