const refStateTree = {
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
            attendanceIds: [],
            activityIds: []
            //...
        }//each object on customerDetails should be saved not overwritten so we can cache for later
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
    },

    //lookups
    entities: {
        attendeesInActivity: {
            byId: {
                2: {
                    id: 2,
                    attendeeIds: []
                }
            },
            allIds: [2,44,54,/*....*/] //Activity Ids
        },
        //attendees in activity filtered by specific day..
        attendeesUnderCustomer: {
            byId: {
                1: {
                    id: 1,
                    attendeeIds: []
                }
            },
            allIds: [1] //customer Ids
        },
        activitiesUnderCustomer: {
            byId: {
                3: {
                    id: 3,
                    activityIds: []
                }
            },
            allIds: [3] //Customer Ids
        },
        customersInActivity: {
            byId: {
                6: {
                    id: 6,
                    customerIds: []
                }
            },
            allIds: [6] //Activity Ids
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

//need to add in filters as well..
//need to add in entities for notes and alerts by activities. also by customers??
