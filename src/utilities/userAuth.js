import { AsyncStorage } from 'react-native';

export const loginTokenName = 'USER_TOKEN';

export async function _checkUserLoggedIn () {
    try {
        const token = await AsyncStorage.getItem('USER_TOKEN');
        if (token === null) {return false;}
        else return true;
    } catch (error) {
        return error;
    }
};

export async function _setUserToken(key, item) {
    try {
        await AsyncStorage.setItem(key, item);
    } catch (error) {
        console.log(error);
    }
};

export const _signUserOut = () => {

};
