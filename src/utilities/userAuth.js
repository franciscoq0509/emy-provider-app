import { AsyncStorage } from 'react-native';

export const loginTokenName = 'USER_TOKEN';

export async function _getUserToken () {
    try {
        const token = await AsyncStorage.getItem(loginTokenName);
        if (token === null) {
            return false;
        }
        else {
            return JSON.parse(token);
        }
    } catch (error) {
        return error;
    }
};




export async function _checkUserLoggedIn () {
    try {
        const token = await AsyncStorage.getItem(loginTokenName);
        if (token === null) {
            return false;
        }
        else {
            return true;
        }
    } catch (error) {
        return error;
    }
};


export async function _setUserToken(key, item) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(item));
        return await AsyncStorage.getItem(loginTokenName);  
    } catch (error) {
    }
};

export const _signUserOut = () => {

};
