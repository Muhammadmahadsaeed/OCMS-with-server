import React from 'react';
import { Dimensions} from 'react-native'
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Home from '../../Home';
import * as calls from '../Calls/index';
import * as chat from '../Chat/index';
import * as camera from '../Camera/index';
import * as contact from '../contact/index';
import * as AuthScreens from '../AuthScreens/index';
import LoginSignupSegment from './LoginSignupSegment';
import * as Profile from '../profile/index';
import ContactSearchBar from '../../common/ContactSearchbar';
import colors from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import font from '../../constants/font';
import HeaderBackButton from '../../common/HeaderBack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import CustomDrawer from '../../common/CustomDrawer';
const Auth = createStackNavigator(
  {
    TabScreen: {
      screen: LoginSignupSegment,

      navigationOptions: {
        headerShown: false,
      },
    },

    Login: {
      screen: AuthScreens.login,
      navigationOptions: {
        headerShown: false,
      },
    },
    ForgotPwd: {
      screen: AuthScreens.ForgotPassword,
      navigationOptions: {
        headerTransparent: true,
        headerBackImage: () => <HeaderBackButton />,
        headerTitle: '',
      },
    },
    PhoneRegister: {
      screen: AuthScreens.PhoneRegister,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
    },
    Phone: {
      screen: AuthScreens.PhoneLogin,
      navigationOptions: {
        headerShown: false,
      },
    },
    PhoneOtp: {
      screen: AuthScreens.PhoneOTP,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
    },
    EmailOtp: {
      screen: AuthScreens.EmailOTP,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
    },
    ResetPassword: {
      screen: AuthScreens.ResetPassword,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
    },
    Register: {
      screen: AuthScreens.register,
      navigationOptions: {
        headerTransparent: true,
        headerBackImage: () => <HeaderBackButton />,
        headerTitle: '',
      },
    },
    Success: {
      screen: AuthScreens.SuccessScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },

  {
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
);

const Chat_StackNavigator = createStackNavigator({
  allChat: {
    screen: chat.ChatsTab,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerShown: false,
    }),
  },
});
const Camera_StackNavigator = createStackNavigator({
  camera: {
    screen: camera.CameraTab,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerShown: false,
    }),
  },
});
const Call_StackNavigator = createStackNavigator({
  AllCalls: {
    screen: calls.CallsTab,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerShown: false,
    }),
  },
});
// Tab Navigation for chat,call,status
const TabScreen = createMaterialTopTabNavigator(
  {
    Camera: {
      screen: Camera_StackNavigator,
    },
    Chats: {
      screen: Chat_StackNavigator,
    },
    Call: {
      screen: Call_StackNavigator,
    },
  },
  {
    tabBarComponent: Home,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#bbb',
    },
    initialRouteName: 'Chats',
  },
);
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: TabScreen,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
    },
    chatRoom: {
      screen: chat.ChatRoom,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
    },
    cameraFromChat: {
      screen: chat.CameraFromChat,
      navigationOptions: ({navigation}) => ({
        safeAreaInsets: {top: 0},
        headerShown: false,
      }),
    },
    // imageGrid: {
    //   screen: chat.ImagePreview,
    //   // navigationOptions: ({navigation}) => ({
    //   //   safeAreaInsets: {top: 0},
    //   //   headerShown: false,
    //   // }),
    // },
    contact: {
      screen: contact.contact,
      navigationOptions: ({navigation}) => ({
        headerTitle: '',
        headerShown: false,
        // header: () => <ContactSearchBar navigationProps={navigation} />,
      }),
    },
    profile: {
      screen: Profile.Profile,
      navigationOptions: ({navigation}) => ({
        headerTitle: '',
        headerTransparent: () => true,
        headerBackImage: () => <HeaderBackButton />,
      }),
    },
    userProfile: {
      screen: Profile.UserProfile,
      navigationOptions: ({navigation}) => ({
        headerTitle: '',
        headerTransparent: () => true,
        headerBackImage: () => <HeaderBackButton />,
      }),
    },
  },
  {
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
);
Camera_StackNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == 'camera') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
//Drawer Navigator Which will provide the structure of our App
const DrawerNavigator = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    HomeScreen: {
      screen: HomeStack,
    },
  },
  {
    //For the Custom sidebar menu we have to provide our CustomSidebarMenu
    contentComponent: CustomDrawer,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width,
    drawerPosition: 'left',
    // drawerBackgroundColor: "transparent",
  },
);
const RootNavigator = createSwitchNavigator({
  SplashScreen: AuthScreens.Splash,
  TermAndConditionScreen: AuthScreens.TermAndCondition,
  AuthScreen: Auth,
  HomeScreen: DrawerNavigator,
});

const MainNavigator = createAppContainer(RootNavigator);

export default MainNavigator;
