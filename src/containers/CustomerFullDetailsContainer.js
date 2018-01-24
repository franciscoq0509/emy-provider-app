import React from 'react';
import { Text, View, ActivityIndicator, DeviceEventEmitter } from 'react-native';
import {Button} from 'react-native-elements';
import { connect } from 'react-redux';
import findId from '../utilities/findId';
import { CustomerFullDetails } from '../components/CustomerFullDetails';
import { saveCustomerDetails, saveCustomerDetailsFailure, requestCustomerDetails, userCancelledDetailsRequest } from '../actions/customers';
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
        console.log('findAndSetPrimaryContact');
        console.log(id);
        console.log(this.props.allCustomerDetails.allDetails);
        let primaryContact = Object.keys(this.props.allCustomerDetails.allDetails).find(arr_id => arr_id === id) 
            ? 
                this.props.allCustomerDetails.allDetails[id] 
            : 
                false

        console.log(primaryContact);
        return primaryContact;
        //const primaryContact = findId(id, this.props.allCustomerDetails.allDetails);
        //return primaryContact;
    }; 

    setDetailsState() {
        const { phoneNumbers, addresses, emergencyContacts, healthInfo, schoolInformation, allDetails, familyDoctors, parentAuthorizedPickups, providerAuthorizedPickups, providerUnauthorizedPickups, parentUnauthorizedPickups, customQuestions } = this.props.allCustomerDetails;
        const id = this.props.navigation.state.params.customerId;
        const primaryContact = this.findAndSetPrimaryContact(allDetails[id].primary_contact.id);
        console.log('.........>>>>>..........');
        console.log(primaryContact);
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
            console.log('uauauauauaua');
            console.log(allDetails[id].primary_contact.id);
            this.dispatchNewCustomerDetails(allDetails[id].primary_contact.id);
        }
    };

    returnCustomerDetails = (id, jwt) => {

        return (dispatch) => {
            console.log('about to call the fetch');
            console.log(id);
            console.log(`details fetching flag ${this.props.isCustomerDetailsFetching}`);
            return fetchCustomerDetails(id, jwt)
                .then(
                    (details) => details.json(),
                    (err) => err   
                )
                .then(
                    (customerDetailsObject) => {
                        if(this.props.isCustomerDetailsFetching) {
                            console.log(this.props.navigation.state);
                            console.log('this is fullDetail^^^^^^^^^^^^^^^^^');
                            return dispatch(saveCustomerDetails(customerDetailsObject));
                        } else {
                            console.log('this is NOT fullDetail]]]]]]]]]]]]');
                            return dispatch(userCancelledDetailsRequest());
                        }
                    }
                )
                .catch((err) => err);
        };
    };

    dispatchNewCustomerDetails(id) {
        this.props.dispatch(requestCustomerDetails());
        const fullDetailsFromStore = findId(this.props.navigation.state.params.customerId, this.props.allCustomerDetails.allDetails);
        // if(!fullDetailsFromStore){
            console.log('============about to dispatch return customer details');
            this.props.dispatch(this.returnCustomerDetails(id, this.props.fullJwt))
            .then((result) => 
                {   
                    if('type' in result && result.type === 'SAVE_FULL_CUSTOMER_DETAILS') {
                        console.log('ksksksksksksksks');
                        this.setDetailsState();
                    } else if ('type' in result && result.type !== 'USER_CANCELLED_DETAILS_REQUEST'){
                        this.setState({advancedDataLoadFailed: true, allCustomerDetails: 'error loading'});
                    }
                })
            .catch((err) => {
                console.log('about to set state for failed');
                if(this.props.navigation.state.routeName === 'fullDetail' || this.props.navigation.state.routeName === 'mainList') {
                    this.setState({advancedDataLoadFailed: true, allCustomerDetails: 'error loading'})
                }
            })
        // } else {
        //     console.log('should be 2nd pass through with data saved to store /////////////');
        //     this.setDetailsState();
        // }
    };

    showSpinner() {
        console.log(`show spinner  ${this.props.isCustomerDetailsFetching}`);
        return this.props.isCustomerDetailsFetching ? true : false;
    }

    componentWillMount() {
        ENV = _ENV_();
        //this.props.navigation.state.routeName = 'fullDetail';
        this.setState(() => ({showMoreClicked: false, clickHandler: this.clicked, advancedDataLoadFailed: false})); 
        //setTimeout(()=>{
            console.log('FULL DETAILS COMP WILL MOUNT +=+=+=+++++=+==++=');
            console.log(this.props.navigation.state.routeName);
            console.log(this.props);
            if(this.props.navigation.state.params.customerId) {
                this.setState(() => ({
                        basicCustomerDetails: this.props.screenProps.filteredCustomers[this.props.navigation.state.params.customerId]
                    })
                );
                const fullDetailsFromStore = findId(this.props.navigation.state.params.customerId, this.props.allCustomerDetails.allDetails);
                if(fullDetailsFromStore) {
                    console.log('0-0-0-0-0-0-0-0-0');
                    this.setDetailsState();               
                } else {
                    
                    //setTimeout(()=>{
                        //if(this.props.isCustomerDetailsFetching) {
                            console.log('oqoqoqoqoqoqoq');
                            this.dispatchNewCustomerDetails(this.props.navigation.state.params.customerId);
                      //  }
                    //},1000);
                    
                    //this.dispatchNewCustomerDetails();
                }
    
            }
        //},1500); 
        
    };

    // static navigationOptions = ({ navigation }) => ({
    //     headerLeft: <Button title="Home" onPress={() => {
    //                     console.log('about to go back');
    //                     //navigation.state.routeName = 'mainList';
    //                     navigation.goBack(navigation.state.key);
    //                 }
    //             } />
    //         });

    // shouldComponentUpdate(nextProps, nextState) {
    //     if(nextProps.filteredCustomers !== this.props.filteredCustomers || nextProps.isCustomerFetching !== this.props.isCustomerFetching) {
    //         return true;
    //     }
    //     return false;
    // }

    render() {
        console.log('FULL DETAILS ===============================');
        console.log(this.props.navigation.state.routeName);
        console.log(this.props.isCustomerDetailsFetching);
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

// <View style={ center = {flex:1} }>
//     <View style={spinnerStyle.container}>
//         <ActivityIndicator
//             animating = {true}
//             size = "large"
//         />
//     </View>
// </View>



const mapStateToProps = (state) => {
    return {
        customerData: state.customersData.allCustomers,
        allCustomerDetails: state.customersDetails,
        fullJwt: state.jwt.fullJwt,
        isCustomerDetailsFetching: state.currentCustomerAction.isCustomerDetailsFetching
    }
};

export default connect(mapStateToProps)(CustomerDetails);