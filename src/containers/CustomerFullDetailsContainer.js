import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import findId from '../utilities/findId';
import { CustomerFullDetails } from '../components/CustomerFullDetails';
import { saveCustomerDetails, saveCustomerDetailsFailure, requestCustomerDetails } from '../actions/customers';
import { _ENV_, providerGuid } from '../config/_ENV_';
import spinnerStyle from '../components/styles/spinnerStyle';

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
        const primaryContact = findId(id, this.props.allCustomerDetails.allDetails);
        return primaryContact;
    }; 

    setDetailsState() {
        //console.log(this.props.allCustomerDetails);
        const { phoneNumbers, addresses, emergencyContacts, healthInfo, schoolInformation, allDetails, familyDoctors, parentAuthorizedPickups, providerAuthorizedPickups, providerUnauthorizedPickups, parentUnauthorizedPickups, customQuestions } = this.props.allCustomerDetails;
        //console.log(schoolInformation);
        const id = this.props.navigation.state.params.customerId;
        const primaryContact = this.findAndSetPrimaryContact(allDetails[id].primary_contact.id);
        console.log(emergencyContacts[id]);
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
            //console.log('disptching new fetch for primary contact details');
            this.dispatchNewCustomerDetails(allDetails[id].primary_contact.id);
        }
    };

    returnCustomerDetails = (id, jwt) => {
        return (dispatch) => {
            dispatch(requestCustomerDetails());
            return fetchCustomerDetails(id, jwt)
                .then(
                    (details) => details.json(),
                    (err) => err   
                )
                .then(
                    (customerDetailsObject) => {
                        return dispatch(saveCustomerDetails(customerDetailsObject));
                    }
                )
                .catch((err) => err);
        };
    };

    dispatchNewCustomerDetails(id = this.props.navigation.state.params.customerId) {
        this.props.dispatch(this.returnCustomerDetails(id, this.props.fullJwt))
        .then((result) => 
            {   
                if('type' in result && result.type === 'SAVE_FULL_CUSTOMER_DETAILS') {
                    this.setDetailsState();
                } else {
                    this.setState({advancedDataLoadFailed: true, allCustomerDetails: 'error loading'});
                }
            })
        .catch((err) => {console.log('about to set state for failed');this.setState({advancedDataLoadFailed: true, allCustomerDetails: 'error loading'})})
    };

    showSpinner() {
        console.log(this.props.actions.isFetching);
        return this.props.actions.isFetching ? true : false;
    }


    componentWillMount() {
        ENV = _ENV_();
        this.setState(() => ({showMoreClicked: false, clickHandler: this.clicked, advancedDataLoadFailed: false})); 
        if(this.props.navigation.state.params.customerId) {
            console.log(this.props);
            this.setState(() => ({
                    basicCustomerDetails: this.props.screenProps.filteredCustomers[this.props.navigation.state.params.customerId]
                })
            );
            const fullDetailsFromStore = findId(this.props.navigation.state.params.customerId, this.props.allCustomerDetails.allDetails);
            if(fullDetailsFromStore) {
                this.setDetailsState();               
            } else {
                this.dispatchNewCustomerDetails();
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
        actions: state.currentCustomerAction
    }
};

export default connect(mapStateToProps)(CustomerDetails);