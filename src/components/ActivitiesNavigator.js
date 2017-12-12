import ActivitiesContainer from '../containers/ActivitiesContainer';
import { ActivityAttendance } from './ActivityAttendance';
import { StackNavigator } from 'react-navigation';

const ActivitiesNavigator = StackNavigator({
    activitiesList: {
        screen: ActivitiesContainer,
    },
    attendance: {
        screen: ActivityAttendance,
    }
});

export default ActivitiesNavigator;