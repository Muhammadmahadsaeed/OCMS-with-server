// Import React and Component
import React, {useState, createRef, useRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import font from '../../constants/font';
import colors from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import {api} from '../../config/env';
import {connect, useDispatch} from 'react-redux';
const isAndroid = Platform.OS === 'android';
const RESEND_OTP_TIME_LIMIT = 30;
let resendOtpTimerInterval;

const EmailOTP = ({navigation}) => {
  const dispatch = useDispatch();
  const mapDispatchToProps = (value) => {
    dispatch({type: 'SET_USER', payload: value});
  };

  const [agree, setAgree] = useState(false);
  const [otpArray, setOtpArray] = useState([]);
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
  );
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(false);

  //ref for input fields
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  useEffect(() => {
    startResendOtpTimer();
    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  const onSubmit = () => {
    var num = parseInt(otpArray.join(''), 10);
    const email = navigation.state.params.email;
    if (isNaN(Number(num))) {
      setErrortext('Please fill out this fields');
    } else {
      setLoading(true);
      fetch(`${api}user/verifyOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          OTP: num,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
        
          if (result.status == '0') {
            setLoading(false);
            setErrortext(result.message);
          } 
          else {
            setLoading(false);
            mapDispatchToProps(result.data);
            navigation.navigate('Success');
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };
  const onResendOtpButtonPress = () => {
    const msg = 'Please verify your email';
    const email = navigation.state.params.email;
    if (inputRef1) {
      setOtpArray([]);
      inputRef1.current.focus();
    }
    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();
    // resend OTP Api call
    fetch(`${api}user/resendOtp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            result.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        } else {
          AlertIOS.alert(msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //here we get permission from user
  const askForPermission = () => {
    navigation.navigate('HomeScreen');
  };
  const refCallback = (textInputRef) => (node) => {
    textInputRef.current = node;
  };
  const setTermAndCondition = () => {
    setAgree(!agree);
  };
  const onOptChange = (index) => {
    return (value) => {
      if (isNaN(Number(value))) {
        return;
      }
      const otpArrayCpy = otpArray.concat();
      otpArrayCpy[index] = value;
      setOtpArray(otpArrayCpy);
      if (value !== '') {
        if (index === 0) {
          inputRef2.current.focus();
        } else if (index === 1) {
          inputRef3.current.focus();
        } else if (index === 2) {
          inputRef4.current.focus();
        }
      }
    };
  };
  const onOTPKeyPress = (index) => {
    return ({nativeEvent: {key: value}}) => {
      //autofocus to previous input if the value is blank and existing value is also blank
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          inputRef1.current.focus();
        } else if (index === 2) {
          inputRef2.current.focus();
        } else if (index === 3) {
          inputRef3.current.focus();
        }
        if (isAndroid && index > 0) {
          const otpArrayCpy = otpArray.concat();
          otpArrayCpy[index - 1] = '';
          setOtpArray(otpArrayCpy);
        }
      }
    };
  };
  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            marginTop: 60,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={require('../../../asessts/images/otpheader.png')} />
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.otpHeading}>
            <Text style={styles.otpHeadingText}>Enter OTP pin ...</Text>
          </View>

          <KeyboardAvoidingView enabled>
            <View style={styles.row}>
              {[inputRef1, inputRef2, inputRef3, inputRef4].map(
                (inputRef, i) => (
                  <View style={styles.SectionStyle} key={i.toString()}>
                    <TextInput
                      ref={refCallback(inputRef)}
                      style={styles.inputStyle}
                      placeholder="?" //12345
                      textAlign={'center'}
                      placeholderTextColor={colors.Colors.gray}
                      keyboardType="numeric"
                      // onSubmitEditing={Keyboard.dismiss}
                      // blurOnSubmit={false}
                      // underlineColorAndroid="#f000"
                      // returnKeyType="next"
                      onFocus={() => setErrortext('')}
                      maxLength={1}
                      onChangeText={onOptChange(i)}
                      onKeyPress={onOTPKeyPress(i)}
                      value={otpArray[i]}
                      textContentType="oneTimeCode"
                      autoFocus={i === 0 ? true : undefined}
                    />
                  </View>
                ),
              )}
            </View>
            {errortext != '' ? (
              <View style={styles.errorView}>
                <Text style={styles.errorTextStyle}>{errortext}</Text>
              </View>
            ) : null}
            <View style={styles.resendCode}>
              <TouchableOpacity
                disabled={resendButtonDisabledTime > 0 ? true : false}
                style={{padding: 10}}
                activeOpacity={0.8}
                onPress={onResendOtpButtonPress}>
                <Text style={[styles.otpHeadingText, {color: '#707070'}]}>
                  Resend Code
                </Text>
              </TouchableOpacity>
              {resendButtonDisabledTime > 0 ? (
                <Text style={[styles.otpHeadingText, {color: '#707070'}]}>
                  {resendButtonDisabledTime} s
                </Text>
              ) : null}
            </View>
            <View
              style={[
                styles.termAndCondition,
                {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <TouchableOpacity
                activeOpacity={0.9}
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
              <Text style={[styles.otpHeadingText, {color: '#707070'}]}>
                I agree to the terms of use and privacy policy
              </Text>
            </View>
            <LinearGradient
              colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.linear}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => onSubmit()}>
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
    </View>
  );
};
export default EmailOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F1F1',
  },
  otpHeading: {
    marginTop: 50,
    marginBottom: 30,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  resendCode: {
    marginTop: 20,
    marginBottom: 30,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  termAndCondition: {
    marginTop: 20,
    marginBottom: 30,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  otpHeadingText: {
    fontSize: 16,
    color: colors.Colors.blueLight,
    fontFamily: font.Fonts.josefBold,
    // textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  SectionStyle: {
    height: 50,
    width: 50,
    backgroundColor: '#E1E1E1',
    borderRadius: 100,
  },
  inputStyle: {
    color: colors.Colors.gray,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#E1E1E1',
    fontFamily: font.Fonts.josefReg,
    fontSize: 20,
    height: 50,
    width: 50,
    textAlign: 'center',
  },
  linear: {
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
    fontFamily: font.Fonts.josefBold,
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
  errorView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'left',
    fontFamily: font.Fonts.josefReg,
    fontSize: 16,
  },
});
