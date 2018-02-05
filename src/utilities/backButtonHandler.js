import {BackHandler} from 'react-native';

//this currenty is only subscribed to by customers navigator but
//will need to be subscribed to by activities and quick book navs
//hopefully both these navs will register their respective 'first screens' as index 0 as well.

let _navState = {
    previous: null,
    current: null
};

export const backButtonHandler = (prev, current) => {
    _navState.previous = prev;
    _navState.current = current;
};

BackHandler.addEventListener('hardwareBackPress', () => {
    if (_navState.current === 0) {
        return false;
    } else {
        BackHandler.exitApp();
    }
});