/*

require('crypto').randomBytes(64).toString('hex')

*/

// Login Configs

const LOGIN_MAXAGE = 5 * (24 * 60 * 60) // 5 days


// Email Verification Configs

const VERIFICATION_MAXAGE = (24 * 60 * 60 ) // 1 day


// Database URL

const getAPIHostURL = (req)=>{
    return `${req.headers['x-forwarded-proto']||'http'}://${req.headers.host}`;
};

module.exports = {
    LOGIN_MAXAGE,
    VERIFICATION_MAXAGE,
    getAPIHostURL
}