export default (id, list) => {
    if(typeof list === 'array') {
        return list.filter((el) => el.id === id);
    }
    if(typeof list === 'object') {
        if(Object.keys(list).length > 0) {
            return Object.keys(list).find((listId) => parseInt(listId, 10) === id) ? list[id] : false;
        } else return false;
    }
};