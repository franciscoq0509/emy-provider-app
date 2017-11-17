const refStateTree = {
    entities : {
        LoggedInUser: {
            id: 'number',
            name: 'string'
            //other relevant info on user
        },
        Customers : {
            id: {
                name: 'string',
                id: 'number',
                activityIds: [/*list of ids to reference all the activities this parent is connected to*/]
            },
            id: {
                name: 'string',
                id: 'number',
                activityIds: []
            }
            //...    
        },
        customerDetails: {
            id: {
                name: 'string',
                location: 'string',
                attendanceIds: []
                //...
            }//each object on details should be saved not overwritten so we can cache for later
        },
        Activities: {
            activityId: {
                activityId: 'number',
                name: 'string',
                attendanceIds: [],
                notesIds: [],
                alertsIds:[]
                //..
            },
            //....  
        },
        attendanceList: {
            id: {
                id: 'number',
                name: 'string',
                //other relevant data on attendee
            },
            id: {
                id: 'number',
                name: 'string',                
                //other relevant data on attendee
            }
        },
        notes: {
            id: {
                //..
            }
        },
        alerts: {
            id: {
                //..
            }
        }
    },
    customersRequested: {
        fromUser: {
            isFetching: false,
            didInvalidate: false,
            customerIds: [/*array of customer ids*/]
        },
        fromApp: {
            isFetching: false,
            didInvalidate: false,
            lastUpdated: 273836787383836, //timestamp
            customerIds: [/*array of customer ids*/]
        }
    },
    activitiesRequested: {
        fromUser: {
            isFetching: false,
            didInvalidate: false,
            activityIds: [/*array of customer ids*/]
        },
        fromApp: {
            isFetching: false,
            didInvalidate: false,
            lastUpdated: 273836787383836, //timestamp
            activityIds: [/*array of customer ids*/]
        }
    }
}
