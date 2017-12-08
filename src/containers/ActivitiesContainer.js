import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { receiveCustomersError,  receiveNewActivities} from '../actions/activities';
import isActivityPastPresentOrFuture from '../utilities/isActivityPastPresentOrFuture';
//receiveActivitiesError,  receiveNewActivities
 
class ActivitiesContainer extends React.Component {

    fetchActivities = (jwt) => (
        fetch('https://emy-front-api.craig.27s-dev.net/activities-api/v1/activities',
            {headers: {Authorization: `Bearer ${jwt}`}}
        )
    ); 

    requestAndReturnActivities = (dispatch) => {
        return (dispatch) => {
            return this.fetchActivities(this.props.jwt)
                .then(
                    (activitiesObject) => activitiesObject.json(),
                    (error) => {
                        this.setState({showLoadError: true});
                        return dispatch(receiveActivitiesError(error))
                    }
                ).then((resp) => {
                    if(resp.success == true) {
                        return dispatch(receiveNewActivities(resp));
                    } else {
                        this.setState({showLoadError: true});
                        return dispatch(receiveActivitiesError(resp))
                    }
                })
                .catch((err) => {
                    this.setState({showLoadError: true});
                    return dispatch(receiveActivitiesError(err))
                })
        };
    }


    componentWillMount() {
        console.log(this.props);
        this.setState(() => ({showLoadError: false}));
        this.props.dispatch(this.requestAndReturnActivities())
            .then(
                (resp) => {
                   if('type' in resp && resp.type === 'RECEIVE_ACTIVITIES_SUCCESS') {
                       console.log(this.props);
                       const timeAwareActivities = this.props.activities.activities.activities.map((act) => isActivityPastPresentOrFuture(act));
                       this.setState({allActivities: timeAwareActivities});
                   } else {
                    this.setState({showLoadError: true, allActivities: 0});
                   }
            })
            .catch((err) => {console.log(err); this.setState({showLoadError: true})});
    }

    render() {
        console.log(this.state);
        return null;
    }
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        activities: state.activities,
        jwt: state.jwt.fullJwt
    }
};

export default connect(mapStateToProps)(ActivitiesContainer);