// Import React and Component
import React, {useState, createRef} from 'react';
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
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import font from '../../constants/font';
import colors from '../../constants/colors';
const ForgotPassword = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [emailEmptyErorr, setEmailEmptyErorr] = useState(false);
  const [isEmailWrong, setIsEmailWrong] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);

  const validate = (text) => {
    const email = text.toLowerCase();
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
  const handleSubmitPress = () => {
    if (userEmail === '') {
      setIsEmailCorrect(false);
      setIsEmailWrong(false);
      setEmailEmptyErorr(true);
    } else {
      console.log(userEmail);
      const msg = 'Please check your email';
      if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
      } else {
        AlertIOS.alert(msg);
      }
      navigation.navigate('ResetPassword');
    }
  };

  return (
    <LinearGradient
      colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1}}>
          <View style={styles.headerImage}>
            <Text style={styles.headerText}>Community App</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <KeyboardAvoidingView enabled>
            <View style={[styles.heading, {marginTop: 40}]}>
              <Text style={styles.headingText}>
                Enter your phone number to continue
              </Text>
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
                underlineColorAndroid="#f000"
                placeholder="Enter your email"
                placeholderTextColor={colors.Colors.gray}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                onFocus={
                  () => setEmailEmptyErorr(false)
                  // this.setState({
                  //   isloading: false,
                  //   showEmailEmptyErorr: false,
                  //   showInvalidErorr: false,
                  // })
                }
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

            <View style={styles.heading}>
              <Text style={styles.headingText}>
                Enter an OTP pin sent to your phone number for confirmation
              </Text>
            </View>
            <View style={styles.row}>
              <View>
                <Image
                  source={require('../../../asessts/images/process.png')}
                />
              </View>
              <LinearGradient
                style={styles.buttonView}
                colors={[colors.Colors.blueLight, colors.Colors.blueDark]}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={handleSubmitPress}>
                  <Text style={styles.buttonTextStyle}>Next</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
export default ForgotPassword;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
  },
  headerImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontFamily: font.Fonts.josefBold,
  },
  footer: {
    backgroundColor: '#FBFBFB',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    bottom: 0,
    // height:'70%'
  },
  heading: {
    width: '70%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  headingText: {
    color: colors.Colors.gray,
    fontFamily: font.Fonts.josefReg,
    fontSize: 18,
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
  inputStyle: {
    flex: 1,
    color: colors.Colors.gray,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: font.Fonts.josefReg,
    fontSize: 20,
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 40,
  },
  buttonView: {
    borderRadius: 30,
  },
  buttonStyle: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 50,
  },

  buttonTextStyle: {
    color: 'white',
    fontFamily: font.Fonts.josefBold,
    fontSize: 18,
  },
});
