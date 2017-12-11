export const setActivitiesSearchFilter = (text = '') => {
    return {   
        type: 'SET_ACTIVITIES_SEARCH_FILTER',
        text
    }
};