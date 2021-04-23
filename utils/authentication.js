var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
	ExtractJWT = require('passport-jwt').ExtractJwt;
var TokenStrategy = require('passport-accesstoken').Strategy;
const InstituteModel = require('../models/institute');
const StudentModel = require('../models/student');
const TeacherModel = require('../models/teacher');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(
	'893848214605-ijqsaquhds154urtb9ib4ndebsq6bu1p.apps.googleusercontent.com'
);

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

passport.use(
	new TokenStrategy(function (token, done) {
		client
			.verifyIdToken({
				idToken: token,
				// audience:
				// 	'893848214605-ijqsaquhds154urtb9ib4ndebsq6bu1p.apps.googleusercontent.com',
			})
			.then(async (response) => {
				const { email_verified, email } = response.payload;

				let res = await StudentModel.findOne({ email: email });
				if (!res) {
					res = await TeacherModel.findOne({ email: email });
				} else {
					res.type = 'student';
				}

				if (email_verified) {
					if (res) {
						return done(null, res);
					} else {
						return done('User not found', null);
					}
				} else {
					done('Email not verified', null);
				}
			})
			.catch((err) => {
				done(err, null);
			});
	})
);

module.exports = { passport };
