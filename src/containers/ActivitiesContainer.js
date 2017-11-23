import React from 'react';
import { View } from 'react-native';
import { connect } from 'redux';
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
                (thing) => {
                    console.log(thing);
            })
    }
};

const mapStateToProps = (state) => ({
    activities
});