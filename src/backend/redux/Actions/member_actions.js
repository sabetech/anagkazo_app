import * as types from '../Types/member_types';

function loadMembers(studentIndex){
    return {
        type: LOAD_MEMBERS,
        payload: studentIndex
    };
}

const actionCreators = {
    loadMembers
}

export {actionCreators};