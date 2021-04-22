var JwtStrategy = require('passport-jwt').Strategy,
	ExtractJWT = require('passport-jwt').ExtractJwt;
var passport = require('passport');
const InstituteModel = require('../models/institute');

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWTSECRET,
		},
		function (jwt_payload, done) {
			InstituteModel.findOne(
				{ name: jwt_payload.username },
				function (err, user) {
					if (err) {
						return done(err, false);
					}
					if (user) {
						return done(null, user);
					} else {
						return done(new Error("Couldn't find the user"), false);
						// or you could create a new account
					}
				}
			);
		}
	)
);

module.exports = { passport };
