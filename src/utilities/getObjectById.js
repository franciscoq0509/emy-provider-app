export const getObjectById = (ids, state) => {
    if(ids !== undefined && state !== undefined) {
        const objects = [];
        ids.map((id) => {objects.push(state[id])});
        objects.filter((o) => o !== undefined);
        return objects;
    } else return null;
}