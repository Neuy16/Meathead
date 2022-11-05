const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
    const user = getUserByUsername(username)
        if (user == null) {
            return done(null, false, { message: 'No User Found' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password Incorrect' })
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'username' },
    authenticateUser))
    passport.serializeUser((user, done) => done(null, user))
/*     passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    }) */
    passport.deserializeUser(function(user, done) {
        done(null, user);
      });
}

module.exports = initialize