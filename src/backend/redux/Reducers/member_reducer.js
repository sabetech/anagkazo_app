import {
    LOAD_MEMBERS
} from '../types';
 
export default function(state={},action){
    switch(action.type){
        case LOAD_MEMBERS:
            return {...state, clickedNumber: action.payload }
        default:
            return state;
    }
}