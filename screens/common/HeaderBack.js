import React, {Component} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';

export default class HeaderBackButton extends Component {
  render() {
    return (
      <View
        style={{
          width: 50,
          height: 50,
        }}>
        <Image
          source={require('../../asessts/images/header-back.png')}
          style={styles.backImage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
