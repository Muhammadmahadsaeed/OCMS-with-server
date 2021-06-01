import {createStackNavigator} from 'react-navigation-stack';
import * as AuthScreens from '../AuthScreens/index';
//Stack Navigator for the Register
export const Register_StackNavigator = createStackNavigator({
    First: {
      screen: AuthScreens.register,
  
      navigationOptions: {
        safeAreaInsets: {top: 0},
        title: 'SIGN UP YOUR ACCOUNT',
        headerTitleStyle: {
          textAlign: 'center',
          // flex: 1,
          fontSize: 14,
          fontFamily: 'Montserrat-Bold_0',
          color: 'white',
        },
        headerStyle: {
          backgroundColor: '#3d900e',
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowOpacity: 0,
          elevation: 0,
        },
      },
    },
    // Second: {
    //   screen: AuthScreens.ChooseImage,
    //   title: 'none',
    //   navigationOptions: {
    //     headerTransparent: true,
    //     headerBackImage: () => <CommonComponents.HeaderBackButton />,
    //     headerTitle: '',
    //   },
    // },
  });


