import { FETCH_ALL_MESSAGES, ADD_NEW_MESSAGE } from "../constants";

const fetchMessageSuccess = (messageArr) => ({
  type: FETCH_ALL_MESSAGES,
  payload: messageArr,
});

export const addNewMessage = (message) => ({
  type: ADD_NEW_MESSAGE,
  payload: message
})

export const getAllMessages = (chatDocRef) => {
  return async (dispatch) => {
    try {
      chatDocRef
        .orderBy("timestamp")
        .get().then((doc) => {
          let messageArray = [];
          doc.forEach((message) => {
            messageArray.push(message.data());
          });
          dispatch(fetchMessageSuccess(messageArray));
        });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const sortMessages = (messageArr) => {
  messageArr.sort(function (a, b) {
    return a.timestamp - b.timestamp;
  });
  return messageArr;
};

export const onSendMessage = (messageBody, sender_id, sender_email, sender_name, chatDocRef, recipient) => {
    try {
      const {
        user_id: recipient_id,
        username: recipient_name,
        email: recipient_email
      } = recipient

      const message = {
        message_body: messageBody,
        sender_id,
        sender_name,
        sender_email,
        recipient_id,
        recipient_name,
        recipient_email,
        timestamp: new Date().getTime(),
      }

      const messageDocRef = chatDocRef
        .doc()

      messageDocRef.set({
        ...message,
        message_id: messageDocRef.id
      });
    } catch (error) {
      console.log(error.message);
    }
};
