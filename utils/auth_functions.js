var { passport } = require('./authentication');

const checkAuth = passport.authenticate('jwt', { session: false });

module.exports = { checkAuth };
