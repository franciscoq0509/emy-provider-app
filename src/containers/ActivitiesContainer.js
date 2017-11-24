import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { receiveCustomersError,  receiveNewActivities} from '../actions/activities';
//receiveActivitiesError,  receiveNewActivities
const fetchActivities = () => (
    fetch('https://front-api.enrolmy.com/activities-api/v1/activities')
);  

const asyncFetch = (dispatch) => {
    return (dispatch) => {
        //dispatch(requestCustomers());
        return fetchActivities()
            .then(
                (activitiesObject) => activitiesObject.json(),
                (error) => dispatch(receiveActivitiesError(error))
            ).then((activities) => {
                return dispatch(receiveNewActivities(activities));
            })
            .catch((err) => dispatch(receiveActivitiesError(err)))
    };
}


class ActivitiesContainer extends React.Component {
    componentDidMount() {
        this.props.dispatch(asyncFetch())
            .then(
                ({ activities }) => {
                   // console.log(activities.activities);
            })
    }

    render() {
        return null;
    }
};

const mapStateToProps = (state) => ({
    activities: state.activities
});

export default connect(mapStateToProps)(ActivitiesContainer);