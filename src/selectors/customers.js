export default (allCustomers, { text }) => {
    console.log(allCustomers);
    if(allCustomers.length !== 0 || text !== ""){
        return allCustomers.filter((customer) => {
            const textMatch = customer.first_name === null || customer.first_name.toLowerCase().includes(text.toLowerCase()) || 
            customer.last_name === null || customer.last_name.toLowerCase().includes(text.toLowerCase());
            return textMatch;
        });
    } else return allCustomers;
};