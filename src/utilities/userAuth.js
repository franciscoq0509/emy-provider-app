import { AsyncStorage } from 'react-native';

export const loginTokenName = 'USER_TOKEN';


// export function _checkUserLoggedIn (callback) {

//     try {
//         AsyncStorage.getItem(loginTokenName)
//             .then((t) => {
//                 console.log('.then token', t);
//                 callback(t);
//             }); 
//     } catch (error) {
//         console.log('error: ', error);
//     }

//     console.log(loginTokenName);
//     return new Promise((resolve, reject) => {
//         AsyncStorage.getItem(loginTokenName, (err, res, body) => {
//             if(err){
//                 reject(err); return;
//             }
//             resolve(body);
//         });
//     }); 
// };

export async function _checkUserLoggedIn () {
    try {
        console.log(loginTokenName);
        const token = await AsyncStorage.getItem(loginTokenName);
        console.log(token);
        if (token === null) {
            console.log('token null');
            console.log(token);
            return false;
        }
        else {
            console.log('retrieved token');
            console.log(token);
            return true;
        }
        // console.log('inside async function', token);
        // token = JSON.parse(token);
        
        // token.then((resp) => {
        //     if (token === null) {
        //         console.log('token null');
        //         console.log(token);
        //         return false;
        //     }
        //     else {
        //         console.log('retrieved token');
        //         console.log(token);
        //         return true;
        //     }
        // });
        
    } catch (error) {
        return error;
    }
};


export async function _setUserToken(key, item) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(item));
        console.log(key);
        return await AsyncStorage.getAllKeys();  
    } catch (error) {
        console.log(error);
    }
};

export const _signUserOut = () => {

};
