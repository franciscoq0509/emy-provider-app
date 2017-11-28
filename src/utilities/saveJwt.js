import React from 'react';
import { connect } from 'react-redux';

// class saveJwt extends React.Component {
//     constructor(props) {
//         super(props);
//         console.log('in save jwt func', props);
//     }
//     // render() {
//     //     return
//     // }s
    
// }

const saveJwt = (jwt) => {
    console.log('in save jwt func', jwt);
};

const mapStateToProps = (state) => ({
    jwt : jwt.all,
    jwtHeaders: jwt.headers,
    jwtPayload: jwt.payload,
    jwtSignature: jwt.sig
});

export default connect()(saveJwt);