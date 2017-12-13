import { normalizeActivityData } from '../normalize/activityData';

export const receiveNewActivities = (activitiesObj) => {
    const normalizedActivities = normalizeActivityData(activitiesObj.activities);
    return {
        type: 'RECEIVE_ACTIVITIES_SUCCESS',
        allActivities : normalizedActivities.allActivities,
        allActivityIds : normalizedActivities.allActivityIds, 
        receivedAt: Date.now()
    }
};

export const receiveActivitiesError = (err) => {
    return {
        type: 'RECEIVE_ACTIVITIES_FAILURE',
        err,
        receivedAt: Date.now()
    }
}

export const receiveCustomersError = (error) => ({ 
    type: 'RECEIVE_CUSTOMERS_FAILURE',
    error,
    receivedAt: Date.now()
});