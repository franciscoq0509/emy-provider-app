export const receiveNewActivities = (activities) => {
    //console.log(activities);
    return {
        type: 'RECEIVE_ACTIVITIES_SUCCESS',
        activities,
        receivedAt: Date.now()
    }
};

export const receiveActivitiesError = (err) => {
    //console.log(err);
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