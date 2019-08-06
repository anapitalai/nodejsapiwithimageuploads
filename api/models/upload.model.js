const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    avatarImage:{type: String,required:true},
    createdAt:Date,
    updatedAt:Date
});

uploadSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.createdAt = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.updatedAt)
    this.updatedAt = currentDate;
    next();
    });
    

    





module.exports = mongoose.model('Uploads',uploadSchema);