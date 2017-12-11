export const setActivitiesSearchFilter = (text = '') => {
    console.log('ACTIVITIES++++++++++');
    return {   
        type: 'SET_ACTIVITIES_SEARCH_FILTER',
        text
    }
};