import { combineReducers } from 'redux';
import member_reducer from './member_reducer';

const rootReducer = combineReducers({
    member_reducer,
});

export default rootReducer;