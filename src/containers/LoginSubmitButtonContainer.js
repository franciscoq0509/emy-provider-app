import React from 'react';
const Buffer = require('buffer/').Buffer;
import { SubmitButton } from '../components/SubmitButton';
import { connect } from 'react-redux';
import { jwtSplit } from '../utilities/jwtSplit';
import { saveNewJwt } from '../actions/jwt';
import { _setUserToken, loginTokenName } from '../utilities/userAuth';


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
    
    startSubmitProcess = () => {
        //this.props.submitCallback();
        //console.log(typeof props.submitCallback);
        
        console.log(this.props);
        fetchJwt('jerrys@gymowner.cxm','L#N#marlin28', guid = '55790419-dbb4-43b4-9c1d-7bae0a37004f')//this.props.uname, this.props.pwd
        .then(
            (data) => {
                if (data.status === 200 && data._bodyText) {
                    const extractedJwt = jwtSplit(data._bodyText); 
                    //console.log(extractedJwt);
                    if(extractedJwt) {
                        this.props.dispatch(saveNewJwt(data._bodyText,extractedJwt)); 
                        _setUserToken(loginTokenName, data._bodyText);
                        console.log(this.props);
                    } else console.log('something went wrong');
                    
                }
            },
            (error) => {console.log(eror)}
        )
        .catch((err) => {console.log(err)});
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






