let rp = require('request-promise');

export const initReqObject = (id) => ({
    id,
    sendReq: (options) => rp(options),
    allowedToFetch: false
});