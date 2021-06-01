import {Post, Get} from '../method';

const sendMessage = (data) => {
    let formdata = new FormData()
    formdata.append('messageText', data.messageText);
    formdata.append('senderId', data.senderId);
    formdata.append('receiverId', data.receiverId);
    formdata.append('messageType', data.messageType);
    formdata.append('sentTime', '2021-04-23 00:12:01');
    data.messageMedia?.forEach((image)=>{
        formdata.append('messageMedia', image);
    })

  return Post('chat', formdata, {
    'content-type': 'multipart/form-data',
  });
};


const chatApis = {
  sendMessage,
};
export default chatApis;
