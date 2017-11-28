const Buffer = require('buffer/').Buffer;

const _options = (guid, uname, pwd) => ({
    method: 'GET',
    uri: 'http://login-dev.enrolmy.com/login?scope=users,client-users,addresses,phones,ethnic-groups,emergency-contacts,family-doctors,educations',
    headers: {
        'Authorization' : `Basic ${new Buffer(uname + ':' + pwd).toString('base64')}`,
        'X-enrolmy-slug' : guid
    }
});

export const createAuth = (uname, pwd, guid = '55790419-dbb4-43b4-9c1d-7bae0a37004f') => {
    console.log(_options(uname, pwd, guid));
    fetch('http://login-dev.enrolmy.com/login?scope=users,client-users,addresses,phones,ethnic-groups,emergency-contacts,family-doctors,educations',_options(guid, uname, pwd))
        .then((data) => {
            console.log(data);
        })
}