const moment = require('moment');

export default (activity) => {
    
    if( 'begins' in activity && 'ends' in activity) {
        const startDate = moment(activity.begins, 'YYYY-MM-DD');
        const endDate = moment(activity.ends, 'YYYY-MM-DD');
        const todaysDate = moment();
        if(startDate.isValid() && endDate.isValid()) {
            if(endDate.isBefore(todaysDate, 'day')) {
                activity.timeCategory = 'past';
                return activity;
            }
            if(startDate.isAfter(todaysDate, 'day')) {
                activity.timeCategory = 'future';
                return activity;
            }
            if(startDate.isBefore(todaysDate, 'day') && 
                endDate.isAfter(todaysDate, 'day') || 
                startDate.isBefore(todaysDate, 'day') && 
                endDate.isSame(todaysDate, 'day')) {
                    activity.timeCategory = 'current';
                    return activity;
            }
            
        } else {
            activity.timeCategory = false;
            return activity;
        }
    } else {
        activity.timeCategory = false;
        return activity;
    }
}