const Buffer = require('buffer/').Buffer;

import saveJwt from './saveJwt';

const _options = (guid, uname, pwd) => ({
    method: 'GET',
    uri: 'https://login-dev.enrolmy.com/login?scope=users,client-users,addresses,phones,ethnic-groups,emergency-contacts,family-doctors,educations',
    headers: {
        'Authorization' : `Basic ${new Buffer(uname + ':' + pwd).toString('base64')}`,
        'X-enrolmy-slug' : guid
    }
});

export const createAuth = (uname, pwd, guid = '55790419-dbb4-43b4-9c1d-7bae0a37004f') => {
    //console.log(_options(guid, uname, pwd));
    fetch('https://login-dev.enrolmy.com/login?scope=users,client-users,addresses,phones,ethnic-groups,emergency-contacts,family-doctors,educations',_options(guid, uname, pwd))
        .then(
            (data) => {
                (data.status === 200 && data._bodyText) ?
                    saveJwt(data._bodyText)
                :
                    console.log('error here..');
            },
            (error) => {console.log(eror)}
        )
        .catch((err) => {console.log(err)});
}       