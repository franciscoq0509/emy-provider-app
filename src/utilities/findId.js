export default (id, list) => {
    if(typeof list === 'array') {
        return list.filter((el) => el.id === id);
    }
    if(typeof list === 'object') {
        if(Object.keys(list).length > 0) {
            console.log(list);
            console.log(id);
            return Object.keys(list).find((listId) => parseInt(listId, 10) === parseInt(id, 10)) ? list[id] : false;
        } else return false;
    }
};