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
import {useSelector, useDispatch} from 'react-redux';
import {getContactFromPhone} from '../../module/ContactList';
import {getContactLengthFromPhone} from '../../module/ContactLength';

const SuccessScreen = (navigation) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const addToContact = (value) => {
    dispatch({type: 'ADD_TO_CONTACT', payload: value});
  };
  const addToContactCount = (value) => {
    dispatch({type: 'ADD_TO_CONTACT_COUNT', payload: value});
  };
  const {user, contactLengthCounter} = useSelector((state) => state);
  const askForPermissions = async () => {
    setLoading(true);
    if (user.user.user.role === 'User') {
      if (Platform.OS !== 'android') {
        return Promise.resolve(true);
      }
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: 'Contacts',
              message: 'This app would like to view your contacts.',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            try {
              const getUserContactLength = await getContactLengthFromPhone();
              const getMatchContact = await getContactFromPhone(
                getUserContactLength,
                contactLengthCounter,
              );
              setLoading(false);
              if (getMatchContact) {
                addToContactCount(getMatchContact.contactLength);
                addToContact(getMatchContact.matchContact);
                navigation.navigation.navigate('HomeScreen');
              } else {
                navigation.navigation.navigate('HomeScreen');
              }
            } catch (e) {
              setLoading(false);
              console.log(e);
            }
          } else {
            setLoading(false);
            navigation.navigation.navigate('HomeScreen');
            console.log('permission denied');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
    } else {
      setLoading(false);
      navigation.navigation.navigate('HomeScreen');
    }
  };

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
          nonumy eirmod labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo.
        </Text>
      </View>
      <LinearGradient
        colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[styles.linearBtn, {marginTop: 50}]}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => askForPermissions()}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};
export default SuccessScreen;

const styles = StyleSheet.create({
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
});
