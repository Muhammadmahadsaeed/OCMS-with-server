import Contacts from 'react-native-contacts';
import {api} from '../config/env';

const getContactFromPhone = async (contactLength, length) => {
  return new Promise((resolve, reject) => {
    if (contactLength > length.contactLength) {
      Contacts.getAll()
        .then((contacts) => {
          const contactArr = contacts.map((item) => {
            if (item.phoneNumbers.length > 0) {
              let userContact = {
                name: item.displayName,
                number: item.phoneNumbers[0].number,
              };
              return userContact;
            }
          });
          const filteredContact = contactArr.filter(function (x) {
            return x !== undefined;
          });
          fetch(`${api}contact/save`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(filteredContact),
          })
            .then((response) => response.json())
            .then((result) => {
              resolve({
                matchContact: result.data,
                contactLength: {contactLength},
              });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((e) => {
          reject(e);
        });
    } else {
      resolve(false);
    }
  });
};
export {getContactFromPhone};
