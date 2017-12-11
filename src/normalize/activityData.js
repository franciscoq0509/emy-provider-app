import { schema, arrayOf, normalize } from 'normalizr';


export const normalizeActivityData = (activitiesArray) => {
    console.log(activitiesArray);
    const normalizedData = {};
    normalizedData.allActivities = {};
    normalizedData.allActivityIds = [];
    activitiesArray.map((act) => {
        normalizedData.allActivities[act.id] = act;
        normalizedData.allActivityIds.push(act.id);
    });
    return normalizedData;
}