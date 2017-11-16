export default (allCustomers, { text }) => {
    console.log(allCustomers);
    if(allCustomers.length !== 0){
        return allCustomers.filter((customer) => {
            const textMatch = customer.name.first.toLowerCase().includes(text.toLowerCase()) || 
                    customer.name.last.toLowerCase().includes(text.toLowerCase());
            return textMatch;
        });
    } else return allCustomers;
};