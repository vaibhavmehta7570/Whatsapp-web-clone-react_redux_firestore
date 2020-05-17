import { db } from '../services/firebase';
import { GET_ALL_GROUP_MESSAGES, ADD_NEW_MESSAGE } from '../constants';

export const getAllGroupMessages = group => {
  return dispatch => {
    db.collection('groups')
      .doc(group.group_id)
      .collection('messages')
      .orderBy('timestamp')
      .get()
      .then(doc => {
        const groupMessages = []
        doc.forEach(message => {
          groupMessages.push(message.data())
        });
        dispatch({type: GET_ALL_GROUP_MESSAGES, payload: groupMessages})
      })
      .catch(err => console.error("Error fetching messages: ", err));
  };
};

export const addNewGroupMessage = newMessage => ({
  type: ADD_NEW_MESSAGE,
  payload: newMessage,
})

export const sendMessage = (sender, group, message_body) => {
  const { email: sender_email, username: sender_name, user_id: sender_id } = sender;
  const { groupName, group_id } = group;

  const messageDocRef = db.collection('groups').doc(group_id).collection('messages').doc();

  const message = {
    message_id: messageDocRef.id,
    message_body,
    sender_id,
    sender_email,
    sender_name,
    group_id,
    groupName,
    timestamp: new Date().getTime()
  };

  messageDocRef
    .set(message)
    .then(() => console.log('Message sent'))
    .catch(err => console.error('Message sending failed: ', err));

};
