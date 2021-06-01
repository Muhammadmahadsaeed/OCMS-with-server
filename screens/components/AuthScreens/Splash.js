import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';

const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);
  const user = useSelector((state) => state.user.user);
  // const user = useSelector((state) => state);
  // console.log(user)
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      if (user) {
        navigation.navigate('HomeScreen');
      } else {
        navigation.navigate('TermAndConditionScreen');
      }
    }, 1000);
  }, [user]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../asessts/images/aboutreact.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        // size="large"
        style={styles.activityIndicator}
        size={50}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
