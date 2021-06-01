import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  UIManager,
  findNodeHandle,
} from 'react-native';
import Colors from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import font from '../../constants/font';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
const ConversationHeader = (props) => {
  const user = props.navigationProps.navigation.getParam('converstion');
  const url = require('../../../asessts/images/admin.png');
  let _menu = null;
  return (
    <LinearGradient
      style={styles.header}
      colors={[Colors.Colors.blueLight, Colors.Colors.blueDark]}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 1}}>
      {!props.isMessageSelected ? (
        <View style={styles.headerContent}>
          <View style={styles.left}>
            <View style={styles.headerBack}>
              <TouchableOpacity
                style={styles.headerBack}
                activeOpacity={0.8}
                onPress={() => props.navigationProps.navigation.pop()}>
                <Image
                  source={require('../../../asessts/images/left-arrow.png')}
                  style={styles.backIcon}
                />
                <Image
                  source={user.profile ? {uri: user.profile} : url}
                  style={styles.chatImage}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.chatTitle}>
              <TouchableOpacity
                onPress={() =>
                  props.navigationProps.navigation.navigate('profile')
                }
                activeOpacity={0.8}>
                <Text style={styles.name} numberOfLines={1}>
                  {user.userName}
                </Text>
                <Text style={styles.status} numberOfLines={1}>
                  last seen today 11:20 am
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.right}>
            <View style={styles.rightIcon}>
              <TouchableOpacity style={styles.rightImg}>
                <Image
                  source={require('../../../asessts/images/video-call.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.rightIcon}>
              <TouchableOpacity style={styles.rightImg}>
                <Image
                  source={require('../../../asessts/images/voice-call.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.rightIcon}>
              <Menu
                ref={(ref) => (_menu = ref)}
                button={
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.rightImg}
                    onPress={() => _menu.show()}>
                    <Image
                      source={require('../../../asessts/images/more.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                }>
                <MenuItem
                  textStyle={styles.MenuItemStyle}
                  style={styles.menuContainer}>
                  View Contact
                </MenuItem>
                <MenuItem textStyle={styles.MenuItemStyle}>Clear Chat</MenuItem>
              </Menu>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.headerContent}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginLeft: 5,
            }}>
            <View style={styles.rightIcon}>
              <TouchableOpacity style={styles.rightImg}>
                <Image
                  source={require('../../../asessts/images/video-call.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

export default ConversationHeader;

const styles = StyleSheet.create({
  header: {
    height: 65,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  headerBack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  backIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  chatImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    margin: 2,
  },
  chatTitle: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5,
    marginVertical: 10,
    marginRight: 5,
  },
  name: {
    color: '#fff',
    fontFamily: font.Fonts.josefBold,
    fontSize: 20,
  },
  status: {
    color: '#fff',
    fontFamily: font.Fonts.josefReg,
    fontSize: 14,
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    marginRight: 10,
    height: 30,
    width: 28,
  },
  rightImg: {
    padding: 5,
  },

  icon: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  menuContainer: {
    flex: 1,
    // backgroundColor:'red'
  },
  MenuItemStyle: {
    fontFamily: font.Fonts.josefReg,
    fontSize: 14,
  },
});
