import React from 'react';
import { Text, View, ActivityIndicator, DeviceEventEmitter } from 'react-native';
import {Button} from 'react-native-elements';
import { connect } from 'react-redux';
import findId from '../utilities/findId';
import { CustomerFullDetails } from '../components/CustomerFullDetails';
import { saveCustomerDetails, saveCustomerDetailsFailure, requestCustomerDetails, userCancelledDetailsRequest } from '../actions/customers';
import { _ENV_, providerGuid } from '../config/_ENV_';
import spinnerStyle from '../components/styles/spinnerStyle';
//import { initReqObject } from '../utilities/customerDetailsLoadingInit';

const ENV = null;

const fetchCustomerDetails = (id, jwt) => {
    return fetch(ENV.customersFullUrl(providerGuid, id),ENV.customersFullHeaders(providerGuid, jwt)) 
};


class CustomerDetails extends React.Component {
    constructor(props) {
        super(props);
        this.clicked = this.clicked.bind(this);
        this.setDetailsState = this.setDetailsState.bind(this);  
        this.findAndSetPrimaryContact = this.findAndSetPrimaryContact.bind(this); 
        this.dispatchNewCustomerDetails = this.dispatchNewCustomerDetails.bind(this); 
        this.showSpinner = this.showSpinner.bind(this);
    }
    
    clicked() {
        this.setState(()=> ({showMoreClicked: true}));
    };

    findAndSetPrimaryContact(id) {
        let primaryContact = Object.keys(this.props.allCustomerDetails.allDetails).find(arr_id => arr_id === id) 
            ? 
                this.props.allCustomerDetails.allDetails[id] 
            : 
                false

        return primaryContact;
    }; 

    setDetailsState() {
        const { phoneNumbers, addresses, emergencyContacts, healthInfo, schoolInformation, allDetails, familyDoctors, parentAuthorizedPickups, providerAuthorizedPickups, providerUnauthorizedPickups, parentUnauthorizedPickups, customQuestions } = this.props.allCustomerDetails;
        const id = this.props.navigation.state.params.customerId;
        const primaryContact = this.findAndSetPrimaryContact(allDetails[id].primary_contact.id);
        if(primaryContact !== false && 'success' in primaryContact && primaryContact.success === true) {
            this.setState(() => ({
                allCustomerDetails: {
                    phones : phoneNumbers[id],
                    addresses : addresses[id],
                    healthInfo : healthInfo[id],
                    emergencyContacts : emergencyContacts[id],
                    schoolName : schoolInformation.schoolName[id],
                    schoolYear :  schoolInformation.schoolYear[id],
                    familyDoctors: familyDoctors[id],
                    parentAuthorizedPickups : parentAuthorizedPickups[id],
                    providerAuthorizedPickups : providerAuthorizedPickups[id],
                    providerUnauthorizedPickups : providerUnauthorizedPickups[id],  
                    parentUnauthorizedPickups : parentUnauthorizedPickups[id],
                    customQuestions : customQuestions[id],
                    primaryContact
                }
            }));
        } else {
            //fetch for the primary contact
            this.dispatchNewCustomerDetails(allDetails[id].primary_contact.id);
        }
    };

    returnCustomerDetails = (id, jwt) => {

        return (dispatch) => {
            return fetchCustomerDetails(id, jwt)
                .then(
                    (details) => details.json(),
                    (err) => err   
                )
                .then(
                    (customerDetailsObject) => {
                        if(this.props.isCustomerDetailsFetching) {
                            return dispatch(saveCustomerDetails(customerDetailsObject));
                        } else {
                            return dispatch(userCancelledDetailsRequest());
                        }
                    })
                .catch((err) => err);
        };
    };

    dispatchNewCustomerDetails(id) {
        this.props.dispatch(requestCustomerDetails());
        const fullDetailsFromStore = findId(this.props.navigation.state.params.customerId, this.props.allCustomerDetails.allDetails);
        this.props.dispatch(this.returnCustomerDetails(id, this.props.fullJwt))
            .then((result) => 
                {   
                    if('type' in result && result.type === 'SAVE_FULL_CUSTOMER_DETAILS') {
                        this.setDetailsState();
                    } else if ('type' in result && result.type !== 'USER_CANCELLED_DETAILS_REQUEST'){
                        this.setState({advancedDataLoadFailed: true, allCustomerDetails: 'error loading'});
                    }
                })
            .catch((err) => {
                if(this.props.navigation.state.routeName === 'fullDetail' || this.props.navigation.state.routeName === 'mainList') {
                    this.setState({advancedDataLoadFailed: true, allCustomerDetails: 'error loading'})
                }
            });
    };

    showSpinner() {
        return this.props.isCustomerDetailsFetching ? true : false;
    }

    componentWillMount() {
        ENV = _ENV_();
        this.setState(() => ({showMoreClicked: false, clickHandler: this.clicked, advancedDataLoadFailed: false})); 
        if(this.props.navigation.state.params.customerId) {
            this.setState(() => ({
                    basicCustomerDetails: this.props.screenProps.filteredCustomers[this.props.navigation.state.params.customerId]
                })
            );
            const fullDetailsFromStore = findId(this.props.navigation.state.params.customerId, this.props.allCustomerDetails.allDetails);
            if(fullDetailsFromStore) {
                this.setDetailsState();               
            } else {
                this.dispatchNewCustomerDetails(this.props.navigation.state.params.customerId);
            }
        }
    };

    render() {
        return (
            <View style={ center = {flex:1} }>
                {
                    this.showSpinner() ? 
                        <View style={spinnerStyle.container}>
                            <ActivityIndicator
                                animating = {true}
                                size = "large"
                            />
                        </View>
                    : 
                        this.state.allCustomerDetails && <CustomerFullDetails
                            basicCustomerDetails={this.state.basicCustomerDetails} 
                            allCustomerDetails = {this.state.allCustomerDetails} 
                            showMoreClicked={this.state.showMoreClicked}
                            clickHandler={this.state.clickHandler}
                            advancedDataLoadFailed  = {this.state.advancedDataLoadFailed}
                            nav = {this.props.navigation.state.params.nav}
                            navigation = {this.props.navigation}
                        />
                }
            </View>            
        );
    };
};

const mapStateToProps = (state) => {
    return {
        customerData: state.customersData.allCustomers,
        allCustomerDetails: state.customersDetails,
        fullJwt: state.jwt.fullJwt,
        isCustomerDetailsFetching: state.currentCustomerAction.isCustomerDetailsFetching
    }
};

export default connect(mapStateToProps)(CustomerDetails);