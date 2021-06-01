import React, {Component} from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import ContactSearchBar from '../../common/ContactSearchbar';
import {fetchUser, api} from '../../config/env';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/colors';
import font from '../../constants/font';
var axios = require('axios');
import {connect} from 'react-redux';
import Contacts from 'react-native-contacts';
import List from './list';
import {getContactFromPhone} from '../../module/ContactList';
import {getContactLengthFromPhone} from '../../module/ContactLength';
class contact extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      result: '',
      limit: 10,
      page: 1,
      isLoading: false,
      loading: true,
      text: '',
      url: require('../../../asessts/images/admin.png'),
      loginCompany: '',
    };
  }
  componentDidMount() {
    const {user} = this.props;
    const role = user.user.user.user.role;
    if (role === 'Enterprise') {
      let loginCompany = user.user.user.user.loginCompany;
      this.setState(
        {
          isLoading: true,
          loginCompany: loginCompany,
        },
        this.getEnterpriseUser,
      );
    } else {
      const length = user.contactLengthCounter;
      this.getPublicUser(length, user.contact);
    }
  }
  getPublicUser = async (length, user) => {
    try {
      const getUserContactLength = await getContactLengthFromPhone();
      const getMatchContact = await getContactFromPhone(
        getUserContactLength,
        length,
      );
      if (getMatchContact) {
        this.props.addToContactCount(getMatchContact.contactLength);
        this.props.addToContact(getMatchContact.matchContact);
        this.setState({
          data: this.state.data.concat(getMatchContact.matchContact),
          isLoading: false,
          loading: false,
        });
      } else {
        this.setState({
          data: this.state.data.concat(user.contact),
          isLoading: false,
          loading: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  getEnterpriseUser = async () => {
    const {limit} = this.state;
    const companyName = {
      loginCompany: this.state.loginCompany,
    };
    await fetch(`${api}contact/getAllContact`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(companyName),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          data: this.state.data.concat(json.data),
          isLoading: false,
          loading: false,
        });
      })
      .catch((err) => console.log('==========', err));
  };

  searchUser = (text) => {
    const {data} = this.state;
    let result = data.filter((item) => {
      return item.userName.includes(text);
    });
    this.setState({result, text});
  };
  renderItemComponent(props) {
    // console.log(props.item.profile);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          this.props.navigation.navigate('chatRoom', {converstion: props.item})
        }>
        <View style={styles.row}>
          <Image
            source={
              props.item.profile
                ? {
                    uri: props.item.profile,
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
              <Text style={styles.nameTxt}>{props.item.userName}</Text>
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

  handleLoadMore = () => {
    this.setState(
      {limit: this.state.limit + 10, isLoading: true},
      this.getEnterpriseUser,
    );
  };
  renderFooter = () => {
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="black" />
      </View>
    ) : null;
  };
  render() {
    const {text, result, data} = this.state;
    const arr = text.length ? result : data;

    return (
      <View style={styles.container}>
        <ContactSearchBar
          navigationProps={this.props}
          searchUser={this.searchUser}
        />
        <LinearGradient
          style={styles.container}
          colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}>
          <View style={styles.innerContainer}>
            {this.state.loading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" animating color="black" />
              </View>
            ) : (
              <FlatList
                data={arr}
                showsVerticalScrollIndicator={false}
                // renderItem={(item) => this.renderItemComponent(item)}
                renderItem={(item) => (
                  <List item={item} navigation={this.props.navigation} />
                )}
                keyExtractor={(item, index) => index.toString()}
                maxToRenderPerBatch={10}
                initialNumToRender={20}
                updateCellsBatchingPeriod={50}
                // onEndReached={this.handleLoadMore}
                // onEndReachedThreshold={0}
                // ListFooterComponent={this.renderFooter}
              />
            )}
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
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
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToContact: (value) => dispatch({type: 'ADD_TO_CONTACT', payload: value}),
    addToContactCount: (value) =>
      dispatch({type: 'ADD_TO_CONTACT_COUNT', payload: value}),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(contact);
