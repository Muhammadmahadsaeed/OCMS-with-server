import {StyleSheet, Dimensions} from 'react-native';
import font from '../../constants/font';

const {width: winWidth, height: winHeight} = Dimensions.get('window');

export default StyleSheet.create({
  alignCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    flex: 1,
    backgroundColor: 'black',
    // flexDirection: 'column',
  },
  header: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headerImageView: {
    height: 50,
    width: 50,
    paddingHorizontal: 10,
  },

  imgView: {
    flex: 3,
  },
  bottomView: {
    // flexDirection: 'row',
    // marginVertical: 5,
    // alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'flex-end',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: font.Fonts.josefReg,
    fontSize: 20,
  },
  btn: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 100,
  },
  bottomToolbar: {
    width: winWidth,
    position: 'absolute',
    height: 100,
    bottom: 0,
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: '#FFFFFF',
  },
  captureBtnActive: {
    width: 80,
    height: 80,
  },
  captureBtnInternal: {
    width: 76,
    height: 76,
    borderWidth: 2,
    borderRadius: 76,
    backgroundColor: 'red',
    borderColor: 'transparent',
  },
  galleryContainer: {
    bottom: 100,
  },
  galleryImageContainer: {
    width: 75,
    height: 75,
    marginRight: 5,
  },
  galleryImage: {
    width: 75,
    height: 75,
  },
});
