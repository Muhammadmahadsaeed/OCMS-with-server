import Contacts from 'react-native-contacts';


const getContactLengthFromPhone = async () => {
    return new Promise((resolve, reject) => {
      Contacts.getCount()
        .then((contactLength) => {
            resolve(contactLength)
        })
        .catch((err) => reject(err));
    });
  };
  export {getContactLengthFromPhone};