import React from 'react';
const Buffer = require('buffer/').Buffer;
import { SubmitButton } from '../components/SubmitButton';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { saveNewJwt } from '../actions/jwt';
import { _setUserToken, loginTokenName, _checkUserLoggedIn } from '../utilities/userAuth';
import { providerGuid, _ENV_ } from '../config/_ENV_';

const ENV = null;
const _options = (guid, uname, pwd) => ({
    method: 'GET',
   // uri: ENV.loginAPI.url,
    headers: {
        'Authorization' : `Basic ${new Buffer(uname + ':' + pwd).toString('base64')}`,
         'X-enrolmy-slug' : guid,
         'x-client-authorization' : ENV.loginAPI.apiKey
    }
});

const fetchJwt = (uname, pwd, guid) => (
    fetch(`${ENV.loginAPI.url}/login?scope=users,client-users,addresses,phones,ethnic-groups,emergency-contacts,family-doctors,educations`,_options(guid, uname.trim(), pwd.trim()))
   // https://login-dev.enrolmy.com/login?scope=users,client-users,addresses,phones,ethnic-groups,emergency-contacts,family-doctors,educations
);

class LoginSubmitButtonContainer extends React.Component {
   
    // componentWillReceiveProps(props) {
    //     console.log(providerGuid);
    // }

    componentWillMount() {
        ENV = _ENV_();
    }

    startSubmitProcess = () => {
        console.log('start submit process');
        console.log(this.props.uname, this.props.pwd, providerGuid);
        fetchJwt(this.props.uname, this.props.pwd, providerGuid)
        .then(
            (data) => {
                console.log(data);
                if (data.status === 200 && data._bodyText) { 
                        this.props.dispatch(saveNewJwt(data._bodyText)); 
                        _setUserToken(loginTokenName, data._bodyText)
                            .then((resp) => {
                                this.props.nav.navigate("SignedIn")
                            })
                            .catch((err) => console.log(err));        
                } else {console.log('failed to login'); this.props.showErrorMessage(data._bodyText);}
            },
            (error) => {console.log('error'); this.props.showErrorMessage(error)}
        )
        .catch((err) => {console.log('catch error'); this.props.showErrorMessage(err)});
    }
    
    render() {
        console.log('in login render')
        return (
            <SubmitButton pressed={this.startSubmitProcess}/>
        );
    }
};

const mapStateToProps = (state) => ({
    jwt : state.jwt.fullJwt,
    jwtHeaders: state.jwt.headers,
    jwtPayload: state.jwt.payload,
    jwtSignature: state.jwt.sig
});

export default connect(mapStateToProps)(LoginSubmitButtonContainer);






