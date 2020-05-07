import { GET_USERS } from '../constants';
import { SEARCH_CONTACTS } from '../constants';
const contactReducer = (state = [], action) => {
	switch (action.type) {
		case GET_USERS:
			return action.data;
		default:
			return state;
	}
};
export default contactReducer;
