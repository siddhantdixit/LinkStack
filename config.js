/*

require('crypto').randomBytes(64).toString('hex')

*/


const JWT_LOGIN_Secret = 'fdb70dc0aab3950f7bf20f906c84cb96a7278f47a0992ff52a5ad290eb234013df468eb1aa0ddcc15943a780f1acd21877e65c668e8c1d7332017b2c34d58c77'

const LOGIN_MAXAGE = 5 * (24 * 60 * 60) // 5 days


module.exports = {
    JWT_LOGIN_Secret,
    LOGIN_MAXAGE
}