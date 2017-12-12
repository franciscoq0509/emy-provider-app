import ActivitiesContainer from '../containers/ActivitiesContainer';
import { ActivityAttendance } from './ActivityAttendance';
import { StackNavigator } from 'react-navigation';

const ActivitiesNavigator = StackNavigator({
    activitiesList: {
        screen: ActivitiesContainer,
        navigationOptions: {
            customers: this.props
        }
    },
    attendance: {
        screen: ActivityAttendance
    }
});

export default ActivitiesNavigator;