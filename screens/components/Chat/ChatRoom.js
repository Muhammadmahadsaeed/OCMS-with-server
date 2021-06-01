import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  ImageBackground,
  FlatList,
  BackHandler,
} from 'react-native';
import InputBox from './InputBox';
import Conversation from './conversation';
import ConversationHeader from './ConversationHeader';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/colors';
import font from '../../constants/font';
import CryptoJS from 'crypto-js';
import socketIO from 'socket.io-client';
import Animated from 'react-native-reanimated';
import RBSheet from 'react-native-raw-bottom-sheet';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import axios from 'axios';
import {api, socketApi} from '../../config/env';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import chatApis from '../../../api/services/chat';
import moveAttachment from './MoveToDirFolder';
class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.InputBoxRef = React.createRef();
    this.state = {
      userId: 2,
      senderId: '',
      url: require('../../../asessts/images/admin.png'),
      isMessageSelected: false,

      data: [],
      receiverId: '',
    };

    this.socket = socketIO(socketApi, {
      transports: ['websocket'],
      forceNew: true,
      upgrade: false,
    });
    this.socket.connect();
    this.socket.on('connect', () => {
      console.log('connected to socket server');
    });
    // get previous messages
    this.getMessages();
    this.socket.on(
      'chat message',
      () => {
        this.getMessages();
      },
      () => {},
    );
  }
  componentDidMount() {
    const converstion = this.props.navigation.getParam('converstion');
    this.setState({
      receiverId: converstion._id,
      senderId: this.props.user.user.user._id,
    });
  }

  getDataFromInput = async (msg) => {
    //notify new message
    // this.socket.emit('input', 'sent');
    const {senderId, receiverId} = this.state;
    if (msg.type === 'text') {
      this.socket.emit(
        'chat message',
        {
          messageText: msg.message.text,
          messageType: msg.type,
          senderId: senderId, //login user id
          receiverId: receiverId, //recvr user id
          sentTime: new Date().now,
        },
        () => {},
      );
    } else {
      let formdata = new FormData();
      formdata.append('messageText', 'hello');
      formdata.append('senderId', senderId);
      formdata.append('receiverId', receiverId);
      formdata.append('messageType', msg.type);
      formdata.append('sentTime', '2021-04-23 00:12:01');
      msg.message.file?.forEach((image) => {
        formdata.append('messageContent', image);
      });
      msg.message.file?.forEach((time) => {
        formdata.append('recordDuration', time.recordTime);
      });

      await fetch(`${api}chat/`, {
        method: 'POST',
        headers: {
          'content-type': 'multipart/form-data',
        },
        body: formdata,
      })
        .then((response) => response.json())
        .then((json) => {
          this.socket.emit(
            'chat message',
            {
              messageType: msg.type,
              senderId: senderId, //login user id
              receiverId: receiverId, //recvr user id
              sentTime: '2021-04-23 00:12:01',
            },
            () => {},
          );
        })
        .catch((err) => console.log(err));
    }
    // const userMsg = {
    //   senderId: senderId,
    //   receiverId: receiverId,
    //   messageText: msg.message.text,
    //   messageType: msg.type,
    //   sentTime: '2021-04-23 00:12:01',
    //   messageMedia: msg.message.image,
    // };
    // try {
    //   const res = await chatApis.sendMessage(userMsg);
    //   // this.setState({data: [...this.state.data, msg]});
    //   console.log("=====",res)
    // } catch (err) {
    //   console.log(err);
    // }
    //   let formdata = new FormData();
    //   formdata.append('messageText', 'hello');
    //   formdata.append('senderId', senderId);
    //   formdata.append('receiverId', receiverId);
    //   formdata.append('messageType', msg.type);
    //   formdata.append('sentTime', '2021-04-23 00:12:01');
    //   msg.message.image?.forEach((image)=>{
    //     formdata.append('messageMedia', image);
    // })

    //   fetch(`http://192.168.0.115:3000/chat/`, {
    //     method: 'POST',
    //     headers: {
    //       'content-type': 'multipart/form-data',
    //     },
    //     body: formdata,
    //   })
    //     .then((response) => response.json())
    //     .then((json) => {
    //       console.log(json);
    //       // this.socket.emit('input', 'sent');
    //     })
    //     .catch((err) => console.log(err));

    // another socket config
    // this.setState({data: [...this.state.data, msg]});
    // this.socket.emit(
    //   'chat message',
    //   () => {
    //     console.log("=========",senderId)

    // messageText: msg.message.text,
    // messageType: msg.type,
    // senderId: senderId, //login user id
    // receiverId: receiverId, //recvr user id
    // sentTime: new Date().now,
    //   },
    //   () => {},
    // );
  };
  getMessages = async () => {
    const senderId = this.props.user.user.user._id;
    const converstion = this.props.navigation.getParam('converstion');
    await fetch(`${api}chat/conservation`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        senderId: senderId, //login user id
        receiverId: converstion._id, //recvr user id
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // let message = json.data.map((item) => {
        //   let bytes = CryptoJS.AES.decrypt(
        //     item.messageContent,
        //     'secret key 123',
        //   );
        //   let encryptedMsg = bytes.toString(CryptoJS.enc.Utf8);
        //   return {
        //     _id: item._id,
        //     isRead: item.isRead,
        //     messageContent: encryptedMsg,
        //     messageType: item.messageType,
        //     receivedTime: item.receivedTime,
        //     receiverId: item.receiverId,
        //     senderId: item.senderId,
        //     sentTime: item.sentTime,
        //   };
        // });
        // this.setState({chatMessages: [...this.state.chatMessages, ...message]});
        // this.setState({data: [...this.state.data, ...message]});
        this.setState({data: json.data.reverse()});
      })
      .catch((err) => console.log(err));
  };

  selectDocument = async () => {
    this.RBSheet.close();
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      const docArr = res.map((item) => {
        let file = {
          name: item.name,
          type: item.type,
          uri:
            Platform.OS === 'android'
              ? item.uri
              : item.uri.replace('file://', ''),
        };
        return file;
      });
      let messageObj = {
        userId: 2,
        type: 'document',
        message: {
          file: docArr,
        },
      };
      this.getDataFromInput(messageObj);
      // for (const result of res) {
      //   const fileUrl = result.uri.replace('file://', '');
      //   const fileName = result.uri.replace('file://', '');

      //   RNFetchBlob.fs
      //     .readStream(fileName, 'base64', 1048576)
      //     .then((ifStream) => {
      //       ifStream.open();
      //       ifStream.onData((data) => {
      //         let base64 = `data:${result.type};base64,${data}`;
      //         const fileExt = result.type.split('/');
      //         const param = {
      //           base64: base64,
      //           height: 300,
      //           width: 300,
      //           fileName: result.name,
      //           size: 1048576, // size, in bytes
      //           type: result.type,
      //           ext: fileExt[1],
      //           fileUri: result.uri,
      //         };
      //         let messageObj = {
      //           userId: 2,
      //           type: 'document',
      //           message: param,
      //         };
      //         this.getDataFromInput(messageObj);
      //       });
      //       ifStream.onError((err) => {
      //         console.log(err);
      //       });
      //     });
      // }
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        console.log('Canceled from single doc picker');
      } else {
        //For Unknown Error
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  selectImage = () => {
    this.RBSheet.close();
    // this.props.navigation.navigate('imageGrid');
    // this.InputBoxRef.current.getAlert();
    ImagePicker.openPicker({
      multiple: true,
      // includeBase64: true,
      compressImageQuality: 0.8,
      maxFiles: 5,
      compressImageMaxHeight: 400,
      compressImageMaxWidth: 300,
      mediaType: 'photo',
    })
      .then((images) => {
        if (images.length > 5) {
          console.log('5 s zaida h bhai');
        } else {
          let imageArr = images.map((item) => {
            const imageName = item.path.split('/').pop();
            let img = {
              name: imageName,
              type: item.mime,
              uri:
                Platform.OS === 'android'
                  ? item.path
                  : item.path.replace('file://', ''),
            };

            return img;
          });

          let messageObj = {
            userId: 2,
            type: 'image',
            message: {
              file: imageArr,
            },
          };

          this.getDataFromInput(messageObj);
        }
      })
      .catch((err) => console.log(err));
  };
  selectVideo = async () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    })
      .then((video) => {
        console.log(video);
      })
      .catch((err) => console.log(err));
  };
  renderContent = () => (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 10,
        }}>
        <View>
          <TouchableOpacity
            onPress={() => this.selectImage()}
            activeOpacity={0.8}>
            <Image
              source={require('../../../asessts/images/gallery-icon.png')}
            />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => this.selectDocument()}
            activeOpacity={0.8}>
            <Image source={require('../../../asessts/images/doc-icon.png')} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.selectVideo()}
            activeOpacity={0.8}>
            <Image source={require('../../../asessts/images/audio-icon.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  openAttachmentModal = () => {
    this.RBSheet.open();
  };
  componentWillUnmount() {
    ImagePicker.clean()
      .then(() => {
        console.log('removed all tmp images from tmp directory');
      })
      .catch((e) => {
        console.log(e);
      });
  }
  getSelectedMessage = (message) => {
    if (message) {
      this.setState({isMessageSelected: true});
    } else {
      this.setState({isMessageSelected: false});
    }
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <ConversationHeader
          navigationProps={this.props}
          getSelectedMessage={this.getSelectedMessage}
          isMessageSelected={this.state.isMessageSelected}
        />
        <LinearGradient
          style={styles.container}
          colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}>
          <View style={styles.innerContainer}>
            <FlatList
              style={{
                flex: 1,
              }}
              showsVerticalScrollIndicator={false}
              data={this.state.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <Conversation
                  // myId={this.state.userId}
                  myId={this.state.senderId}
                  message={item}
                  index={index.toString()}
                  getSelectedMessage={this.getSelectedMessage}
                />
              )}
              inverted={true}
            />
            <InputBox
              ref={this.InputBoxRef}
              getDataFromInput={this.getDataFromInput}
              navigation={this.props}
              openAttachmentModal={this.openAttachmentModal}
            />
          </View>
        </LinearGradient>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={300}
          closeOnDragDown={true}
          openDuration={300}
          keyboardAvoidingViewEnabled={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
            container: {
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            },
          }}>
          {this.renderContent()}
        </RBSheet>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(ChatRoom);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
});
