import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import font from '../../constants/font';
import colors from '../../constants/colors';
class Profile extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <ImageBackground
        source={require('../../../asessts/images/tobias.jpg')}
        style={{flex: 1}}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View style={styles.header}>
            <View style={styles.bio}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}>
                <Text style={styles.name}>Syed Ali Jawwad</Text>
                <Text style={styles.lastseen}>Last Seen 2:45 pm</Text>
              </View>
            </View>
          </View>
          <View style={styles.form}>
            <View style={styles.notificationView}>
              <Text style={styles.notificationViewText}>Notifications</Text>
              <Text>Toggle button</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.aboutText}>About</Text>
              <View style={styles.status}>
                <Text style={styles.notificationViewText}>At Work</Text>
                <Text style={[styles.notificationViewText, {fontSize: 12}]}>
                  March 27, 2021
                </Text>
              </View>
              <View style={styles.status}>
                <View style={{flex:1}}>
                  <Text numberOfLines={1} style={styles.notificationViewText}>
                    mahadkhan809@gmail.com
                  </Text>
                </View>

                <View style={styles.iconView}>
                 
                <TouchableOpacity style={{padding:10,marginHorizontal:5}}>
                    <Image
                      source={require('../../../asessts/images/blue-icon-chat.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{padding:10,marginHorizontal:5}}>
                    <Image
                      source={require('../../../asessts/images/blue-icon-video.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{paddingVertical:10,paddingLeft:10}}>
                    <Image 
                      source={require('../../../asessts/images/blue-call-icon.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.status, styles.row]}>
              <Text style={[styles.notificationViewText, {color: '#FC5656'}]}>
                Clear Chat
              </Text>
              <Image source={require('../../../asessts/images/bin.png')} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: 10,
  },
  bio: {
    backgroundColor: 'rgba(255,255,255,0.34)',
    marginHorizontal: 20,
    borderRadius: 8,
    paddingVertical: 20,
  },
  name: {
    flex: 1,
    color: 'white',
    fontFamily: font.Fonts.josefReg,
    fontSize: 18,
  },
  lastseen: {
    color: '#FFFFFF',
    fontFamily: font.Fonts.josefReg,
    fontSize: 14,
  },
  form: {
    backgroundColor: '#FBFBFB',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    bottom: 0,
  },
  notificationView: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 20,
    paddingHorizontal:10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 10,
  },
  row: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    // marginVertical: 20,
    paddingVertical: 20,
    paddingHorizontal:10,
    borderRadius: 10,
    marginBottom: 20,
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationViewText: {
    color: '#3D3D3D',
    fontFamily: font.Fonts.poppinRegular,
    fontSize: 16,
  },
  aboutText: {
    color: '#43AEFF',
    fontSize: 16,
    fontFamily: font.Fonts.josefReg,
  },
  iconView: {
    flexDirection: 'row',
  },
});
