import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import findId from '../utilities/findId';
import { CustomerFullDetails } from '../components/CustomerFullDetails';
import { saveCustomerDetails, saveCustomerDetailsFailure } from '../actions/customers';

const fetchCustomerDetails = (id, jwt) => {
    return fetch(`https://emy-front-api.craig.27s-dev.net/providers-api/v1/55790419-dbb4-43b4-9c1d-7bae0a37004f/users/${id}`, 
        {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'X-enrolmy-slug': '55790419-dbb4-43b4-9c1d-7bae0a37004f'
            }
        }
    )
};

const returnCustomerDetails = (id, jwt) => {
    return (dispatch) => {
        return fetchCustomerDetails(id, jwt)
            .then(
                (details) => details.json(),
                (err) => dispatch(saveCustomerDetailsFailure(err))   
            )
            .then(
                
                (customerDetailsObject) => {
                    console.log(customerDetailsObject);
                    return dispatch(saveCustomerDetails(customerDetailsObject));
                }
            )
            .catch((err) => dispatch(saveCustomerDetailsFailure(err)));
    };
};


class CustomerDetails extends React.Component {
    constructor(props) {
        super(props);
        this.clicked = this.clicked.bind(this);
        this.setDetailsState = this.setDetailsState.bind(this);    
    }
    
    clicked() {
        this.setState(()=> ({showMoreClicked: true}));
    };

    setDetailsState() {
        const { phoneNumbers, addresses, emergencyContacts, healthInfo } = this.props.allCustomerDetails;
        console.log(phoneNumbers);
        const id = this.props.navigation.state.params.customerId;
        this.setState(() => ({
            allCustomerDetails: {
                phones : phoneNumbers[id],
                addresses : addresses[id],
                healthInfo : healthInfo[id],
                emergencyContacts : emergencyContacts[id]
            }
        })); 
    }

    componentWillMount() {
        console.log(this.props);
        this.setState(() => ({showMoreClicked: false, clickHandler: this.clicked})); 
        if(this.props.navigation.state.params.customerId) {
            this.setState(() => ({
                    basicCustomerDetails: this.props.screenProps.filteredCustomers[this.props.navigation.state.params.customerId]
                })
            );
            const fullDetailsFromStore = findId(this.props.navigation.state.params.customerId, this.props.allCustomerDetails.allDetails);
            console.log(fullDetailsFromStore);
            if(fullDetailsFromStore) {
                console.log('======================found it in store=======================');
                this.setDetailsState();
                
            } else {
                console.log('need to fetch....');
                this.props.dispatch(returnCustomerDetails(this.props.navigation.state.params.customerId, this.props.fullJwt))
                .then((result) => 
                    {   
                        console.log(result);
                        this.setDetailsState();
                        console.log(this.props);
                    })
                .catch((err) => {console.log(err)})
            }

        }
    }

    render(){
        console.log('==============about to try render=============');
        console.log(this.props);
        console.log(this.state);
        return (
            <View>
                { this.state.allCustomerDetails && <CustomerFullDetails
                    basicCustomerDetails={this.state.basicCustomerDetails} 
                    allCustomerDetails = {this.state.allCustomerDetails} 
                    showMoreClicked={this.state.showMoreClicked}
                    clickHandler={this.state.clickHandler} 
                />}
            </View>
        );
    };
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        customerData: state.allCustomers,
        allCustomerDetails: state.customersDetails,
        fullJwt: state.jwt.fullJwt
    }
};

export default connect(mapStateToProps)(CustomerDetails);