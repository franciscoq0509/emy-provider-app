import React from 'react';
import { connect } from 'react-redux';
import { requestCustomers, receiveNewCustomers, receiveCustomersError } from '../actions/customers';
import CustomersListNavigator from '../components/CustomersListNavigator';
import { getFilteredCustomers } from '../selectors/index';
import { _ENV_, getProviderGuid } from '../config/_ENV_';
import { deleteJwt } from '../actions/jwt';
import { signUserOut } from '../utilities/userAuth';
//import { SignedOutNavigator } from '../navigator/SignedOutNavigator';
import { NavigationActions } from 'react-navigation';
import { _signUserOut } from '../utilities/userAuth';
import configureStore from '../store/configureStore';
import AppIndex from '../components/AppIndex';


const ENV = null;
const providerGuid = null;


const fetchCustomers = (jwt) => {
    console.log(jwt);
    console.log(providerGuid);
    console.log(`${ENV.customersBasicUrl(providerGuid)}`, ENV.customersBasicHeaders(jwt));
    return fetch(
        ENV.customersBasicUrl(providerGuid),ENV.customersBasicHeaders(jwt)
    )
};

class CustomersListContainer extends React.Component {


    customersThunk = (dispatch) => {
        
        return (dispatch) => {
            dispatch(requestCustomers());
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

    // deletJwtThunk = (dispatch) => {
    //     return (dispatch) => {
    //         return new Promise (dispatch => dispatch(deleteJwt()));
    //             // .then(
    //             //     (resp) => resp,
    //             //     (error) => error
    //             // ).catch((err) => err));
    //     }
        
    // }

    showLoadingSpinner = () => {
        console.log('show loading spinnner called');
        return this.props.actions.isFetching ? true : false;
    }

    componentWillMount() {
        console.log(this.props);
        //this.props.nav.navigation.navigate('ErrorLogout');
        ENV = _ENV_();
        this.setState(() => ({showSpinner: this.showLoadingSpinner, showLoadError: false}));
        getProviderGuid()
            .then((guid) => {
                if(guid !== null) {
                    providerGuid = guid;
                    this.props.dispatch(this.customersThunk())
                        .then(
                            (resp) => { 
                                if('type' in resp) {
                                    console.log(resp);
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
        console.log('error clicked');
        console.log(this.props);
        //this.props.nav.navigation.navigate('ErrorLogout', {error: 'exit'});
        console.log(this.props);
        ////////////////////
        // this.props.dispatch(this.deletJwtThunk())
        //     .then((resp) => {
        //         console.log(resp);
        //         console.log(this.props.jwt);
     
        //     })
        //     .catch((err) => err);
        //signUserOut(); already done in login component
        //this.props.nav.navigation.navigate('ErrorLogout');
        ///////////////////////
        
        _signUserOut()
            .then(()=> {
                console.log('deleted, signUserOut');
                console.log(this.props);
                this.props.dispatch(deleteJwt());
                console.log('after dispatch...');
                    // .then(() => {
                        //console.log('=================.then of dispatch');
                        // const resetToLogin = NavigationActions.reset({
                        //     index: 0,
                        //     actions: [
                        //         NavigationActions.navigate({ routeName: 'ErrorLogout' })
                        //     ]
                        // }); 
                        //this.props.nav.navigation.navigate('ErrorLogout');
                    // })
                
                // setTimeout(()=>{
                    
                // },2000);
                console.log('=================.then of dispatch');
                //configureStore().deleteStore();
                //this.props.nav.navigation.navigate('SignedOut');


                const resetToLogin = NavigationActions.reset({
                    index: 2,
                    actions: [
                        NavigationActions.navigate({ routeName: 'SignedOut' })
                    ]
                }); 
                this.props.rootNav.navigate('SignedOut');
                
                
            });

        
        
    }

	componentWillReceiveProps(nextProps) {
        console.log(nextProps); 
		if(this.props !== nextProps) {
            this.setState(() => ({filteredCustomers : nextProps.filteredCustomers}));
		}
	}

    render() { 
        console.log(this.props);     
        return (
            <CustomersListNavigator 
                screenProps = { 
                    {   
                        customers: this.state.customers, 
                        filteredCustomers: this.state.filteredCustomers, 
                        showSpinner: this.state.showSpinner,
                        showLoadError: this.state.showLoadError,
                        errorLogout : this.goToLogin
                    } 
                } 
                nav={this.props.nav}
            />
        );
    };
};

const mapStateToProps = (state) => ({
    filteredCustomers: getFilteredCustomers(state, state, state),
    actions: state.currentCustomerAction,
    jwt: state.jwt.fullJwt 
    
});

export default connect(mapStateToProps)(CustomersListContainer);