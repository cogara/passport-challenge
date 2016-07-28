var mongoose = require('mongoose');
var Schema = mongoose.Schema
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;



var UserSchema = new Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  admin: {type: Boolean}
});

UserSchema.pre('save', function(next) {
  var user = this;

  //only hash PW if modified or new
  if(!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, SALT_WORK_FACTOR, function(err, hash) {
    if(err) {
      return next(err);
    }

    //override the cleartext password with the hashed one
    user.password = hash;
    return next();
  });

  //generate a salt --- NOT NEEDED, OUTDATED
  // bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
  //   if (err) {
  //     return next(err);
  //   }
    //hash PW along with new salt

  // });
});


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  // cb(null, this.password == candidatePassword);
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) {
      console.log(err);
      return cb(err);
    }
    console.log(isMatch);
    cb(null, isMatch);
  });
};


module.exports = mongoose.model('User', UserSchema);
