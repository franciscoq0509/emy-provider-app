const Buffer = require('buffer/').Buffer;
const { connect } from 'react-redux';

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


const LoginSubmitButtonContainer = () => {
    //console.log(_options(guid, uname, pwd));
    //fetch('https://login-dev.enrolmy.com/login?scope=users,client-users,addresses,phones,ethnic-groups,emergency-contacts,family-doctors,educations',_options(guid, uname, pwd))
    fetchJwt(uname, pwd, guid)
        .then(
            (data) => {
                (data.status === 200 && data._bodyText) ?
                    console.log('arrived', data);
                :
                    console.log('error here..');
            },
            (error) => {console.log(eror)}
        )
        .catch((err) => {console.log(err)});
};

const mapStateToProps = (state) => ({
    jwt : jwt.all,
    jwtHeaders: jwt.headers,
    jwtPayload: jwt.payload,
    jwtSignature: jwt.sig
});






