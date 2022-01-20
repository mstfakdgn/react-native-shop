import AsyncStorage from '@react-native-async-storage/async-storage';


export const LOG_IN = 'LOG_IN';
export const SIGN_UP = 'SIGN_UP';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_OUT = 'LOG_OUT';

let timer;

export const authenticate = (userId, token,expiresIn) => {
    dispatch(setLogoutTimer(expiresIn));
    return {
        type:AUTHENTICATE,
        userId:userId,
        token:token
    }
}

export const signUp = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfzEr9AUS3QAgV3rIBGJxW-GuCn0IwuG0', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:email,
                password:password,
                returnSecureToken: true
            })
        })

        if (!response.ok) {
            const errResData = await response.json();
            const errorID = errResData.error.message; 

            let message='';
            if (errorID === 'EMAIL_EXISTS') {
                message ='Email exists already!';
            }
            throw new Error(message);
        }
        
        const resData = await response.json();
        console.log(resData);

        dispatch(setLogoutTimer(parseInt(resData.expiresIn) * 1000));
        dispatch({
            type: SIGN_UP,
            token: resData.idToken,
            userId: resData.localId
        });
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId,expirationDate);
    }
}

export const logOut = () => {
    clearLogoutTimer();
    deleteUserDataFromStorage();
    return{
        type: LOG_OUT
    };
}

const clearLogoutTimer = () => {
    if(timer) {
        clearTimeout(timer);
    }
}

const setLogoutTimer = expirationTime => {
    return dispatch => {
            timer = setTimeout(() => {
                dispatch(logOut());
            },expirationTime);
    }
}

export const logIn = (email, password) => {
    console.log('logIn');
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfzEr9AUS3QAgV3rIBGJxW-GuCn0IwuG0', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:email,
                password:password,
                returnSecureToken: true
            })
        })
        
        if (!response.ok) {
            const errResData = await response.json();
            const errorID = errResData.error.message; 

            let message='';
            if (errorID === 'EMAIL_NOT_FOUND') {
                message ='Email bulunamadı!';
            } else if (errorID === 'INVALID_PASSWORD') {
                message ='Password is invalid!';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);

        dispatch(setLogoutTimer(parseInt(resData.expiresIn) * 1000));
        dispatch({
            type: LOG_IN,
            token: resData.idToken,
            userId: resData.localId
        });
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId,expirationDate);
    }
}

const saveDataToStorage = (token, userId,expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({token:token, userId:userId,expirationDate:expirationDate.toISOString()}));
}

const deleteUserDataFromStorage = () => {
    AsyncStorage.removeItem('userData');
}