// Import react
import React from 'react';

// Import react-native components
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Animated, {Easing} from 'react-native-reanimated';
import colors from '../constants/colors';

import LinearGradient from 'react-native-linear-gradient';
import font from '../constants/font';
const {Value, timing} = Animated;

// Calculate window size
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// Declare component
class ContactSearchBar extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      isFocused: false,
      keyword: '',
    };
    // animation values
    this._input_box_translate_x = new Value(width);
    this._back_button_opacity = new Value(0);
  }

  _onFocus = () => {
    // update state
    this.setState({isFocused: true});
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };
    const back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
    };
    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start();
    timing(this._back_button_opacity, back_button_opacity_config).start();

    // force focus
    this.refs.input.focus();
  };

  _onBlur = () => {
    // update state
    this.setState({isFocused: false});
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: width,
      easing: Easing.inOut(Easing.ease),
    };
    const back_button_opacity_config = {
      duration: 50,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };

    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start();
    timing(this._back_button_opacity, back_button_opacity_config).start();

    // force blur
    this.refs.input.blur();
  };
  setText(value) {
    this.setState({keyword: value});
    this.props.searchUser(value);
   
  }
  render() {
    return (
      <SafeAreaView style={styles.header_safe_area}>
        <LinearGradient
          style={styles.header}
          colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}>
          <View style={styles.header_inner}>
            <View style={styles.left}>
              <View style={styles.row}>
                <View style={styles.back_icon_box}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.props.navigationProps.navigation.pop()}>
                    <Image
                      source={require('../../asessts/images/left-arrow.png')}
                      style={{width: 30, height: 30}}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{marginLeft: 20}}>
                  <Text style={styles.heading}>Select contact</Text>
                  <Text style={styles.text}>150 contacts</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.row}>
                  <View style={styles.right}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={this._onFocus}
                      style={styles.search_icon_box}>
                      <Image
                        source={require('../../asessts/images/search.png')}
                        style={{height: 25, width: 25}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.right}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.search_icon_box}>
                      <Image
                        source={require('../../asessts/images/more.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <Animated.View
              style={[
                styles.input_box,
                {transform: [{translateX: this._input_box_translate_x}]},
              ]}>
              <Animated.View style={{opacity: this._back_button_opacity}}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  underlayColor={'#ccd0d5'}
                  onPress={this._onBlur}
                  style={styles.back_icon_box}>
                  <Image
                    source={require('../../asessts/images/left-arrow.png')}
                    style={{width: 30, height: 30}}
                  />
                </TouchableOpacity>
              </Animated.View>
              <TextInput
                ref="input"
                placeholder="Search..."
                clearButtonMode="always"
                value={this.state.keyword}
                onChangeText={(value) => this.setText(value)}
                style={styles.input}
              />
            </Animated.View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

export default ContactSearchBar;

const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1000,
  },
  header: {
    height: 65,
  },
  header_inner: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  search_icon_box: {
    padding: 8,
  },
  input_box: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: colors.Colors.blueLight,
    width: '100%',
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 65,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    fontSize: 15,
    fontFamily:font.Fonts.poppinBold
  },
  left: {
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    color: 'white',
    fontFamily: font.Fonts.josefBold,
  },
  text: {
    color: 'white',
    fontFamily: font.Fonts.josefReg,
    fontSize: 16,
  },
});
