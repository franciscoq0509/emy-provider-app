import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { receiveActivitiesError,  receiveNewActivities} from '../actions/activities';
import isActivityPastPresentOrFuture from '../utilities/isActivityPastPresentOrFuture';
import ActivitiesListScreen from '../components/ActivitiesListScreen';
import { getFilteredActivities } from '../selectors/index';
//receiveActivitiesError,  receiveNewActivities
 
class ActivitiesContainer extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: `All Activities`,
      });

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
                    console.log(resp);
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

    componentWillReceiveProps(nextProps) { 
		if(this.props !== nextProps) {
            console.log('next props different');
            console.log(nextProps);

            this.setState(() => ({timeAwareActivities : nextProps.activities}));
		}
	}


    componentWillMount() {
        console.log(this.props);
        this.setState(() => ({showLoadError: false}));
        this.props.dispatch(this.requestAndReturnActivities())
            .then(
                (resp) => {
                    console.log(resp);
                   if('type' in resp && resp.type === 'RECEIVE_ACTIVITIES_SUCCESS') {
                       console.log(this.props.activities);
                       const timeAwareActivities = Object.keys(this.props.activities).map((key) => isActivityPastPresentOrFuture(this.props.activities[key]));
                       console.log(timeAwareActivities);
                       timeAwareActivities = timeAwareActivities.filter((act) => act !== undefined);
                       this.setState({timeAwareActivities});
                   } else {
                    this.setState({showLoadError: true, allActivities: 0});
                   }
            })
            .catch((err) => {console.log(err); this.setState({showLoadError: true})});
    }

    render() {
        console.log(this.state);
        return <ActivitiesListScreen activities={this.state.timeAwareActivities} nav={this.props.navigation.navigate}/>
    }
};


const mapStateToProps = (state) => {
    console.log(state);
    return {
        activities: getFilteredActivities(state, state, state),
        allActivityIds: state.activities.allActivityIds,
        jwt: state.jwt.fullJwt
    }
};

export default connect(mapStateToProps)(ActivitiesContainer);