import React from 'react';
import { connect } from 'react-redux';
import { requestCustomers, receiveNewCustomers, receiveCustomersError, userCancelledDetailsRequest } from '../actions/customers';
import CustomersListNavigator from '../components/CustomersListNavigator';
import { getFilteredCustomers } from '../selectors/index';
import { _ENV_, getProviderGuid } from '../config/_ENV_';
import { deleteJwt } from '../actions/jwt';
import { resetState } from '../actions/resetState';
import { signUserOut } from '../utilities/userAuth';
import { NavigationActions } from 'react-navigation';
import { _signUserOut } from '../utilities/userAuth';
import { clickCount } from '../utilities/customerListClickCount';


const ENV = null;
const providerGuid = null;


const fetchCustomers = (jwt) => {
    return fetch(
        ENV.customersBasicUrl(providerGuid),ENV.customersBasicHeaders(jwt)
    )
};

class CustomersListContainer extends React.Component {


    customersThunk = (dispatch) => {
        
        return (dispatch) => {
            
            return fetchCustomers(this.props.jwt)
                .then(
                    (customersObject) => customersObject.json(),
                    (error) => dispatch(receiveCustomersError(error))
                ).then((customers) => {
                    return dispatch(receiveNewCustomers(customers.users));
                })
                .catch((err) => dispatch(receiveCustomersError(err)))
        };
    };

    showLoadingSpinner = () => {
       // console.log('show spinner');
        //console.log(`customer fetch ${this.props.isCustomerFetching}`);
        //console.log(`details fetch ${this.props.isDetailFetching}`);
        return this.props.isCustomerFetching ? true : false;
    }

    componentWillMount() {
        ENV = _ENV_();
        
        this.props.dispatch(requestCustomers());
        this.setState(() => ({showSpinner: this.showLoadingSpinner, showLoadError: false}));
        getProviderGuid()
            .then((guid) => {
                if(guid !== null) {
                    providerGuid = guid;
                    this.props.dispatch(this.customersThunk())
                        .then(
                            (resp) => { 
                                if('type' in resp) {
                                    if(resp.type === 'RECEIVE_CUSTOMERS_SUCCESS') {
                                        this.setState({showLoadError: false});
                                        this.setState(() => ({filteredCustomers : this.props.filteredCustomers}));        
                                    } else {
                                        //error here
                                        this.setState({showLoadError: true});
                                    }

                                } else {
                                    //error here
                                    this.setState({showLoadError: true});
                                }
                                this.setState(() => ({filteredCustomers : this.props.filteredCustomers}));
                            })
                            .catch((err) => {console.log(`this is the customers errer ${err}`); this.setState({showLoadError: true});})
                }
            })
            .catch((err) => console.log(`error getting guid ${err}`));
    }

    goToLogin = () => {
        _signUserOut()
            .then(() => {
                this.props.dispatch(resetState());
                //below not working..navigating to signedIn even though specifically told to route to signedOut
                // const resetToLogin = NavigationActions.reset({
                //     index: 2,
                //     actions: [
                //         NavigationActions.navigate({ routeName: 'SignedOut' })
                //     ]
                // }); 
                this.props.rootNav.navigate('SignedOut');
            });
    }

	componentWillReceiveProps(nextProps) {
		if(this.props !== nextProps) {
            this.setState(() => ({filteredCustomers : nextProps.filteredCustomers}));
		}
    }
    
    // shouldComponentUpdate(nextProps, nextState) {
    //     if(nextProps.filteredCustomers !== this.props.filteredCustomers || nextProps.isCustomerFetching !== this.props.isCustomerFetching) {
    //         return true;
    //     }
    //     return false;
    // }

    render() { 
        return (
            <CustomersListNavigator 
                onNavigationStateChange = {(prev, current) => {
                    //console.log('PREV: ');
                    //console.log(prev);
                    //console.log('CURRENT: ');
                    //console.log(current);
                    if(current.index === 0) {
                        //console.log('index is 0 cancel details request');
                        clickCount.count = 0;
                        this.props.dispatch(userCancelledDetailsRequest());
                    }
                }}
                screenProps = { 
                    {   
                        customers: this.state.customers, 
                        filteredCustomers: this.state.filteredCustomers, 
                        showSpinner: this.state.showSpinner,
                        showLoadError: this.state.showLoadError,
                        errorLogout : this.goToLogin,
                        dispatch : this.props.dispatch
                    } 
                } 
            />
        );
    };
};

const mapStateToProps = (state) => ({
    filteredCustomers: getFilteredCustomers(state, state, state),
    isCustomerFetching: state.currentCustomerAction.isCustomerFetching,
    //isDetailFetching: state.currentCustomerAction.isCustomerDetailsFetching,
    jwt: state.jwt.fullJwt, 
});

export default connect(mapStateToProps)(CustomersListContainer);