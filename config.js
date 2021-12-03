/*

require('crypto').randomBytes(64).toString('hex')

*/

// Login Configs
const JWT_LOGIN_Secret = 'fdb70dc0aab3950f7bf20f906c84cb96a7278f47a0992ff52a5ad290eb234013df468eb1aa0ddcc15943a780f1acd21877e65c668e8c1d7332017b2c34d58c77'

const LOGIN_MAXAGE = 5 * (24 * 60 * 60) // 5 days


// Email Verification Configs
const JWT_VERIFICATION_Secret = '7e7efd7e76503f6b93d66a6be1cadb8d656ff58169787a302ba815f8312dc0a374a69835e54f9dec62e62dcfd71a74c68023e353c3328920a550881705cc23a4'

const VERIFICATION_MAXAGE = (24 * 60 * 60 ) // 1 day


// Database URL
const dbURI = 'mongodb://localhost:27017/ProjectLinkedList'

const getAPIHostURL = (req)=>{
    return `${req.headers['x-forwarded-proto']||'http'}://${req.headers.host}`;
};

module.exports = {
    JWT_LOGIN_Secret,
    LOGIN_MAXAGE,
    dbURI,
    JWT_VERIFICATION_Secret,
    VERIFICATION_MAXAGE,
    getAPIHostURL
}