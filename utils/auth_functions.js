var { passport } = require('./authentication');

const checkAuth = passport.authenticate('jwt', { session: false });

const studentauth = passport.authenticate('token', { session: false });

module.exports = { checkAuth, studentauth };
