import {LOG_IN,SIGN_UP,AUTHENTICATE,LOG_OUT} from '../actions/auth';

const initialState = {
    userId:null,
    token:null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOG_IN:
            return {
                token:action.token,
                userId:action.userId
            }
        case SIGN_UP:
            return {
                token:action.token,
                userId:action.userId
            }
        case AUTHENTICATE:
            return {
                token:action.token,
                userId:action.userId
            }
        case LOG_OUT:
            return {
                token:null,
                userId:null
            }
        default:
            return state;
    }
}

export default authReducer