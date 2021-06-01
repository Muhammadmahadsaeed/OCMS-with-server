import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
// importing Segmented Control Tab
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {LoginPhoneEmailButton, RegisterPhoneEmailButton} from '../AuthScreens';
import LinearGradient from 'react-native-linear-gradient';
import font from '../../constants/font';
import colors from '../../constants/colors';
const LoginSignupSegment = (navigation) => {
  const [customStyleIndex, setCustomStyleIndex] = useState(0);

  const handleCustomIndexSelect = (index) => {
    // Tab selection for custom Tab Selection
    setCustomStyleIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.header}>
        <View style={styles.headerImage}>
          <Text style={styles.headerText}> Community App</Text>
        </View>
      </LinearGradient>
      <View style={styles.footer}>
        <SegmentedControlTab
          values={['Login', 'Sign up']}
          selectedIndex={customStyleIndex}
          onTabPress={handleCustomIndexSelect}
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
        {customStyleIndex === 0 && (
          <LoginPhoneEmailButton navigationProps={navigation} />
        )}
        {customStyleIndex === 1 && (
          <RegisterPhoneEmailButton navigationProps={navigation} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoginSignupSegment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexGrow: 0.6,
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    // width: '70%',
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontFamily: font.Fonts.josefBold,
  },
  img: {
    resizeMode: 'contain',
    width: '100%',
  },
  tabStyle: {
    backgroundColor: colors.Colors.backgroundColor,
    // borderWidth: 1,
    // borderBottomColor: colors.Colors.blueDark,
    borderColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  activeTabStyle: {
    backgroundColor: colors.Colors.blueLight,
    borderBottomColor: '#045de9',
  },
  tabTextStyle: {
    color: colors.Colors.blueLight,
    fontFamily: font.Fonts.josefBold,
  },
  activeTabTextStyle: {
    color: 'white',
  },
  footer: {
    flex: 0.4,
    backgroundColor: '#f6f6f6',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});
