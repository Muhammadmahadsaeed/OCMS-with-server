import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import font from '../../constants/font';
import colors from '../../constants/colors';
const RegisterPhoneEmailButton = ({navigationProps}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
        style={styles.linear}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigationProps.navigation.navigate('Phone')}>
          <Text style={styles.buttonText}>sign up via phone number</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
        style={[styles.linear, {marginTop: 20}]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigationProps.navigation.navigate('Register')}>
          <Text style={styles.buttonText}>sign up via email address</Text>
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.button}>
        <Text style={styles.text}>- or -</Text>
      </View>
      <View style={styles.linear}>
        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleButtonText}>
            sign in with <Text style={{fontSize: 20}}>g+</Text> google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterPhoneEmailButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 20,
  },
  linear: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 50,
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
  },

  text: {
    color: colors.Colors.blueLight,
    fontSize: 20,
    fontFamily: font.Fonts.josefBold,
  },
  googleButton: {
    marginVertical: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 50,
  },
  googleButtonText: {
    color: 'red',
    fontSize: 14,
    fontFamily: font.Fonts.josefBold,
    textTransform: 'uppercase',
  },
});
