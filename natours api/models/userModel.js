const mongoose = require('mongoose');
//const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have a n email'],
    unique: true,
    lowercase: true,
    //validate: [validator.isEmail, 'Please provide valid email'] //custom vaidator
  },
  photo: String,

  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate:{
        validator: function(el) {
            return el=== this.password;  //validating aganist initial password
        },
        message:'Passwords are not same'
    
    }
  }
//   writeConcern: {
//     w: 'majority',
//     j: true,
//     wtimeout: 1000
//   }
});

UserSchema.pre('save', async function(next) {
    //only run this function if password is modified
    if(!this.isModified('password')) return next();
//hashing ppassword with cost 12 and deleting passConfirm field in db
 this.password = await bcrypt.hash(this.password, 12) //current pass and cost args
 this.passwordConfirm = undefined;
 next();
})
//checking if the password entered by user matches with the password present in the database
//hashing the password entered by the user
UserSchema.methods.correctPassword =async function(cadidatePassword, userPassword) {
    return await bcrypt.compare(cadidatePassword, userPassword)
};


//model
const User = mongoose.model('User', UserSchema);
module.exports = User;
