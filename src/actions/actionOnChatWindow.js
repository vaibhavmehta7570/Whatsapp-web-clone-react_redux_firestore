import { FETCH_ALL_MESSAGES, ADD_NEW_MESSAGE } from "../constants";

const fetchMessageSuccess = (messageArr) => ({
  type: FETCH_ALL_MESSAGES,
  payload: messageArr,
});

export const addNewMessage = (message) => ({
  type: ADD_NEW_MESSAGE,
  payload: message,
});

export const getAllMessages = (chatDocRef) => {
  return async (dispatch) => {
    try {
      chatDocRef
        .orderBy("timestamp")
        .get()
        .then((doc) => {
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
