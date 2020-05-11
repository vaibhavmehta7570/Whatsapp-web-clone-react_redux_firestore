import { FETCH_ALL_MESSAGES } from "../constants";

export const fetchMessageSuccess = (messageArr) => ({
  type: FETCH_ALL_MESSAGES,
  payload: messageArr,
});

export const fetchMessages = (messages, chatDocRef) => {
  return async (dispatch) => {
    try{
      chatDocRef
        .collection("messages")
        .onSnapshot((doc) => {
          let mesageArray = [...messages];
          if (messages.length > 0) {
            let maxTimestamp = 0;
            let newMsgObject;
            doc.forEach((currentObj) => {
              if (currentObj.data().timestamp > maxTimestamp) {
                maxTimestamp = currentObj.data().timestamp;
                newMsgObject = currentObj.data();
              }
            });
            mesageArray.push(newMsgObject);
            dispatch(fetchMessageSuccess(mesageArray));
          } else {
            doc.forEach((message) => {
              mesageArray.push(message.data());
            });
            const sortedMessage = sortMessages(mesageArray);
            dispatch(fetchMessageSuccess(sortedMessage));
          }
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

export const onSendMessage = (messageBody, email, chatDocRef) => {
  return (dispatch) => {
    try {
      var docRef = chatDocRef
        .collection("messages")
        .doc();

      docRef.set({
        message_body: messageBody,
        sender_id: email,
        message_id: docRef.id,
        timestamp: new Date().getTime(),
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
