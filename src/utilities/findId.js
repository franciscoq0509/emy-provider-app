export default (id, list) => {
    console.log(id);
    console.log(list);
    if(typeof list === 'array') {
        console.log('array');
        return list.filter((el) => el.id === id);
    }
    if(typeof list === 'object') {
        console.log('object');
        console.log(Object.keys(list));
        if(Object.keys(list).length > 0) {
            return Object.keys(list).find((listId) => {
                console.log(parseInt(listId, 10));
                console.log(id);
                return parseInt(listId, 10) === id
            }) ? list[id] : false;
        } else return false;
    }
};