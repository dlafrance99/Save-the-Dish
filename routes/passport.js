var bCrypt = require('bcrypt-nodejs');
var User = require('../models').User;

module.exports = function(passport){

    var LocalStrategy = require('passport-local').Strategy;

    var configAuth = require('../config/auth.js');

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

     // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
           if(user) {
                done(null, user.get());
            } else {
                done(user.errors,null);
           }
        });

    });


    // =========================================================================
    // LOCAL ==================================================================
    // =========================================================================

    //LOCAL SIGNUP
    passport.use('local-signup', new LocalStrategy(
        {
            nameField: 'name',
            passwordField: 'password',
            passReqToCallback : true, // allows us to pass back the entire request to the callback
            failureFlash : true //allows flash messages
        },

        function(req, userName, password, done){

            var generateHash = function(password) {
                console.log("BCYRPT Running HERE!!!!!!!!")

                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({where: {name: name}}).then(function(user){

                if (user) {
                    return done(null, false, {message : 'That name is already taken'} );
                } else {

                    var userPassword = generateHash(password);
                    console.log(userPassword);
                    var data = {
                        name: name,
                        password: password,
                        email: req.body.email
                    };

                    data.password = generateHash(data.password);

                    User.create(data).then(function(newUser,created){
                        if(!newUser){
                            return done(null,false);
                        }

                        if(newUser){
                            console.log(newUser)
                            return done(null,newUser);

                        }

                    });
                }


            });



        }



    ));


    //LOCAL SIGNIN
    passport.use('local-login', new LocalStrategy(
        {
             // by default, local strategy uses userName and password
            usernameField : 'userName',
            passwordField : 'password',
            passReqToCallback : true, // allows us to pass back the entire request to the callback
            failureFlash : true
        },

        function(req, userName, password, done) {

            var isValidPassword = function(password, userpass){
                return bCrypt.compareSync(password, userpass);
            }

            console.log(User);

            User.findOne({where: {userName: userName}}).then(function (user) {

                if (!user) {
                    return done(null, false, { message: 'User Name does not exist.  Please create a new account if needed' });
                }

                if (!isValidPassword(password, user.password)) {

                    return done(null, false, { message: 'Incorrect password on previous try.  Please create a new account if needed' });

                }

                var userinfo = user.get();

                return done(null,userinfo);

            }).catch(function(err){

                console.log("Error:",err);

                return done(null, false, { message: 'Something went wrong with your Signin' });


            });

        }
    ))
}