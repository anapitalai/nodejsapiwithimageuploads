
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var userSchema = new Schema({
name: String,
username: { type: String, required: true, unique: true
password: { type: String, required: true },
admin: Boolean,
location: String,
meta: {
age: Number,
website: String
},
created_at: Date,
updated_at: Date
});


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
//var userSchema ...

userSchema.methods.dudify = function() {
// add some stuff to the users name
this.name = this.name + '-dude';
return this.name;
};

var User = mongoose.model('User', userSchema);

module.exports = User;

var User = require('./app/models/user');
// create a new user called chris
var chris = new User({
name: 'Chris',
username: 'sevilayha',
password: 'password'
});

chris.dudify(function(err, name) {
if (err) throw err;
console.log('Your new name is ' + name);
});
// call the built-in save method to save to the database
chris.save(function(err) {
if (err) throw err;
console.log('User saved successfully!');
});

userSchema.pre('save', function(next) {
// get the current date
var currentDate = new Date();
// change the updated_at field to current date
this.updated_at = currentDate;
// if created_at doesn't exist, add to that field
if (!this.created_at)
this.created_at = currentDate;
next();
});



var User = require('./app/models/user');
// create a new user
var newUser = User({
name: 'Peter Quill',
username: 'starlord55',
password: 'password',
admin: true
});
// save the user
newUser.save(function(err) {
if (err) throw err;
console.log('User created!');
});

// get all the users
User.find({}, function(err, users) {
if (err) throw err;
// object of all the users
console.log(users);
});

// get the user starlord55
User.find({ username: 'starlord55' }, function(err, user
if (err) throw err;
// object of the user
console.log(user);
});

User.findById(1, function(err, user) {
if (err) throw err;
// show the one user
console.log(user);
});


var monthAgo = new Date();
monthAgo.setMonth(monthAgo.getMonth() - 1);
User.find({ admin: true }).where('created_at').gt(monthAgo
if (err) throw err;
// show the admins in the past month
console.log(users);
});


User.findById(1, function(err, user) {
if (err) throw err;
// change the users location
user.location = 'uk';
// save the user
user.save(function(err) {
if (err) throw err;
console.log('User successfully updated!');
});
});


// find the user starlord55
// update him to starlord 88
User.findOneAndUpdate({ username: 'starlord55' }, { username
if (err) throw err;
// we have the updated user returned to us
console.log(user);
});

User.findByIdAndUpdate(4, { username: 'starlord88' }, function
if (err) throw err;
// we have the updated user returned to us
console.log(user);
});



// get the user starlord55
User.find({ username: 'starlord55' }, function(err, user
if (err) throw err;
// delete him
user.remove(function(err) {
if (err) throw err;
console.log('User successfully deleted!');
});
});

// find the user with id 4
User.findOneAndRemove({ username: 'starlord55' }, function
if (err) throw err;
// we have deleted the user
console.log('User deleted!');
});

// find the user with id 4
User.findByIdAndRemove(4, function(err) {
if (err) throw err;
// we have deleted the user
console.log('User deleted!');
});


