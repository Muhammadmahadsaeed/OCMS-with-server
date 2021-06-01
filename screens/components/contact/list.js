import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import font from '../../constants/font';
export default class List extends PureComponent {
  state = {
    url: require('../../../asessts/images/admin.png'),
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          this.props.navigation.navigate('chatRoom', {converstion: this.props.item.item})
        }>
        <View style={styles.row}>
          <Image
            source={
              this.props.item.item.profile
                ? {
                    uri: this.props.item.item.profile,
                  }
                : this.state.url
            }
            style={styles.pic}
          />
          <View
            style={{
              flex: 1,
              marginHorizontal: 10,
              paddingVertical: 10,
            }}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {this.props.item.item.userName}
              </Text>
            </View>
            <View style={styles.msgContainer}>
              <View style={{flex: 1}}>
                <Text style={styles.msgTxt}>Hey, I am Syed Kashan Tayyab</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  pic: {
    borderRadius: 100,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  nameTxt: {
    color: 'black',
    fontSize: 20,
    fontFamily: font.Fonts.josefBold,
  },

  msgContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  msgTxt: {
    color: '#666',
    fontSize: 16,
    fontFamily: font.Fonts.josefReg,
  },
});
