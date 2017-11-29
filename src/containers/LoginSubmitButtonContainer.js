import React from 'react';
const Buffer = require('buffer/').Buffer;
import { SubmitButton } from '../components/SubmitButton';
import { connect } from 'react-redux';

const _options = (guid, uname, pwd) => ({
    method: 'GET',
    uri: 'https://login-dev.enrolmy.com/login?scope=users,client-users,addresses,phones,ethnic-groups,emergency-contacts,family-doctors,educations',
    headers: {
        'Authorization' : `Basic ${new Buffer(uname + ':' + pwd).toString('base64')}`,
        'X-enrolmy-slug' : guid
    }
});

const fetchJwt = (uname, pwd, guid = '55790419-dbb4-43b4-9c1d-7bae0a37004f') => (
    fetch('https://login-dev.enrolmy.com/login?scope=users,client-users,addresses,phones,ethnic-groups,emergency-contacts,family-doctors,educations',_options(guid, uname, pwd))
);


class LoginSubmitButtonContainer extends React.Component {
    
    startSubmitProcess = () => {
        //this.props.submitCallback();
        //console.log(typeof props.submitCallback);
        
        console.log(this.props);
        // fetchJwt(uname, pwd, guid)
        // .then(
        //     (data) => {
        //         (data.status === 200 && data._bodyText) ?
        //             console.log('arrived', data)
        //         :
        //             console.log('error here..')
        //     },
        //     (error) => {console.log(eror)}
        // )
        // .catch((err) => {console.log(err)});
    }
    
    render() {
        return (
            <SubmitButton pressed={this.startSubmitProcess}/>
        );
    }
};

const mapStateToProps = (state) => ({
    // jwt : jwt.all,
    // jwtHeaders: jwt.headers,
    // jwtPayload: jwt.payload,
    // jwtSignature: jwt.sig
});

export default connect(mapStateToProps)(LoginSubmitButtonContainer);






