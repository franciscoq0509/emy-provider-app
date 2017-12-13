import React from 'react';
import { connect } from 'react-redux';
import SignedInNavigator from '../navigator/SignedInNavigator';
import { _getUserToken } from '../utilities/userAuth';
import { saveNewJwt } from '../actions/jwt';
import { View, Text, ActivityIndicator } from 'react-native';
import spinnerStyle from '../components/styles/spinnerStyle';




class saveJwtToStore extends React.Component {
    componentWillMount() {
        this.setState({jwt: false});
        _getUserToken()
            .then((token) => {
                token ? 
                this.props.dispatch(saveNewJwt(token))
                :
                console.log('error here');
            })
            .catch(err => console.log(err));
    }

    jwtSaved = () => {
        return this.props.jwt !== null ?
        true: false
    }

    render() {
        let renderJsx = (
            this.jwtSaved() ?
                <SignedInNavigator />
                :
                <View style={spinnerStyle.container}>
                    <ActivityIndicator
                        animating = {true}
                        size = "large"
                    />
                </View>
            );
            return renderJsx;
    }
}

const mapStateToProps = (state) => ({
    jwt: state.jwt.fullJwt 
});

export default connect(mapStateToProps)(saveJwtToStore);