import React from 'react';
const Buffer = require('buffer/').Buffer;
import { SubmitButton } from '../components/SubmitButton';
import { connect } from 'react-redux';
import { saveNewJwt } from '../actions/jwt';
import { _setUserToken, loginTokenName, _checkUserLoggedIn } from '../utilities/userAuth';
import { providerGuid } from '../config/_ENV_';


const _options = (guid, uname, pwd) => ({
    method: 'GET',
    uri: 'https://login-dev.enrolmy.com/login?scope=users,client-users,addresses,phones,ethnic-groups,emergency-contacts,family-doctors,educations',
    headers: {
        'Authorization' : `Basic ${new Buffer(uname + ':' + pwd).toString('base64')}`,
        'X-enrolmy-slug' : guid
    }
});

const fetchJwt = (uname, pwd, guid) => (
    fetch('https://login-dev.enrolmy.com/login?scope=users,client-users,addresses,phones,ethnic-groups,emergency-contacts,family-doctors,educations',_options(guid, uname, pwd))
);

class LoginSubmitButtonContainer extends React.Component {
   
    componentWillReceiveProps(props) {
        console.log(providerGuid);
    }

    startSubmitProcess = () => {
        fetchJwt('jerrys@gymowner.cxm','L#N#marlin28', guid = providerGuid)
        .then(
            (data) => {
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






