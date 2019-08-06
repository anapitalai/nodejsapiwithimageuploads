const mongoose = require('mongoose');

const professionalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    teacherId:{type:mongoose.Schema.Types.ObjectId,ref:'Teachers',required:true},
    fileNumber:{type: String,required:true,unique:true},
    yearsTaught: {type: Number,required:true},
    awards: {type: String,required:true},
    registrationNumber:{type: String,required:true},
    currentPosting:{type: String,required:true},
    currentPosition:{type: String,required:true},
    teachingHistory:{type: String,required:true},
    educationHistory:{type: String,required:true},
    createdAt:Date,
    updatedAt:Date

});

professionalSchema.pre('save', function(next) {
    
    var currentDate = new Date();
    
    this.createdAt = currentDate;
    
    if (!this.updatedAt)
    this.updatedAt = currentDate;

    next();
    });
    

module.exports = mongoose.model('Professional',professionalSchema);