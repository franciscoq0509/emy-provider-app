export default (state, { text }) => {
    console.log(state.allCustomers);
    if(state.allCustomers.length !== 0){
        return state.allCustomers.filter((customer) => {
            const textMatch = customer.name.first.toLowerCase().includes(text.toLowerCase()) || 
                    customer.name.last.toLowerCase().includes(text.toLowerCase());
            return textMatch;
        });
    } else return state.allCustomers;
};