export default (allCustomers, { text }) => {1
    if(allCustomers.length !== 0 && text.length !== 0){
        return allCustomers.filter((customer) => {
            const textMatch = customer.full_name.toLowerCase().search(text.toLowerCase());
            return textMatch >= 0;
        });
    } else return allCustomers;
};