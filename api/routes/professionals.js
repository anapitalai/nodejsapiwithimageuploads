const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');
//const checkAuth = require('../middleware/check-auth');


const Professionals = require('../models/professionals.model');


//get all alumni routes
router.get('/',(req,res,next)=>{
 Professionals.find()
 .select('_id teacherId fileNumber yearsTaught awards registrationNumber currentPosting currentPosition teachingHistory educationHistory')
 .populate('teacherId')
 .exec()
 .then(docs=>{
    res.status(200).json(docs);
})
 .catch(err=>{
     console.log(err);
     res.status(500).json({error:err});
 });
});

//add a new alumni route
router.post('/',(req,res,next)=>{
    const professional = new Professionals({
        _id: new mongoose.Types.ObjectId(),
        teacherId:req.body.teacherId,
        fileNumber: req.body.fileNumber,
        yearsTaught: req.body.yearsTaught,
        awards: req.body.awards,
        registrationNumber :req.body.registrationNumber,
        currentPosting:req.body.currentPosting,
        currentPosition :req.body.currentPosition,
        teachingHistory:req.body.teachingHistory,
        educationHistory:req.body.educationHistory
    }); 
    professional
    .save()
    .then((professionalData)=>{
        console.log(professionalData);
        res.status(201).json({
            message:'New Professional Details created',
            createdTeacher:professionalData
           });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });


});

//get single alumni route
router.get('/:memberId',(req,res,next)=>{
    const id=req.params.memberId;
    Professionals.findById(id)
    //.select('_id name dob nid province district village childCount spouse maritalStatus')
    .exec()
    .then(doc=>{
       console.log('From DB',doc);
       if(doc){
        res.status(200).json(doc);
       }
        else{
            res.status(400).json({
                message:'No valid member for the given ID'
            });
        }
      
   })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
   });
   

   router.put('/:memberId',(req,res)=>{
    const _id = req.params.memberId;

    Professionals.findOneAndUpdate({ _id },
      req.body,
      { new: true },
      (err, professional) => {
      if (err) {
         res.status(400).json(err);
      }
       res.json(professional);
    });
    });


//delete route

router.delete('/:memberId',(req,res,next)=>{
    const id=req.params.memberId;
    Professionals.deleteOne({_id:id})
    .exec()
    .then(result=>{
       res.status(200).json(result);
   })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
   });



module.exports = router;