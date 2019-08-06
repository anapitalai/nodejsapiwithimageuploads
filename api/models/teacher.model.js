const mongoose = require('mongoose');


const teacherSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type: String,required:true},
    description:{type:String,required:true},
    price: {type: Number,required:true},
    propertyImages:{type:[],required:true}
    //createdAt:Date,
    //updatedAt:Date
});

teacherSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.createdAt = currentDate;
    if (!this.updatedAt)

    this.updatedAt = currentDate;
    next();

    });
    

module.exports = mongoose.model('Teachers',teacherSchema);