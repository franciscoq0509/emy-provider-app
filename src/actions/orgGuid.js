export const saveOrgGuid = (guid) => {
    return {
        type : 'SAVE_ORG_GUID',
        guid
    };
};

export const deleteOrgGuid = () => {
    return {
        type : 'DELETE_ORG_GUID'
    }
}