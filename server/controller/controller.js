var Userdb=require('../model/model');
const {Link} = require('../../models/link');
const Profile = require('../../models/profile');

// Create and save new user
exports.create=(req,res)=>{
// validate request
if(!req.body){
    res.status(400).send({message:"Content can not be empty!"})
    return;
}

// // new user
// const user=new Userdb({
//     title:req.body.title,
//     url:req.body.url,
    
//     visibility:req.body.visibility
// })

// // save user in the datebase
// user
//   .save(user)
//   .then(data=>{
//     //   res.send(data)
//     res.redirect('/dashboard/add-user')
//   })
//   .catch(err=>{
//       res.status(500).send({
//           message:err.message||"Some error occured while creating a create operation"
//       });
//   });


  // new link
  const mynewLink = new Link({
    title:req.body.title,
    url:req.body.url,
    
    visibility:req.body.visibility
  })

  Profile.updateOne({userid:res.locals.myuserid},{$push:{ links : mynewLink}})
    .then(data=>{
        //   res.send(data)
        res.redirect('/dashboard/add-user')
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message||"Some error occured while creating a create operation"
        });
    });

}

// retrieve and return all users/retrive and return a single user
exports.find=(req,res)=>{

   if(req.query.id){
       const id=req.query.id;

       Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found user with id:"+id})
            }else {
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error retrieving user with id"+id})
        })
   }else{
    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Error Occurred while retriving user information"})
    })
   }

 
}

// Update a new identified user by user id 
exports.update=(req,res)=>{
if(!req.body){
    return res
     .status(400)
     .send({message:"Data to update can not be empty"})
}

const id=req.params.id;
Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
.then(data=>{
    if(!data){
        res.status(404).send({message:`Cannot update user with ${id}.Maybe user not found!`})
    }else{
        res.send(data)
    }
 })
.catch(err=>{
    res.status(500).send({message:"Error update user information"})
})
}

// Delete a new identified user by user id 
exports.delete=(req,res)=>{
  const id=req.params.id;

  Userdb.findByIdAndDelete(id)
  .then(data=>{
      if(!data){
          res.status(404).send({message:`Cannot delete with id ${id}. Maybe id is wrong`})
      }else{
         res.send({
             message:"User was deleted successfully!"
         }) 
      }
  })  
   .catch(err=>{
       res.status(500).send({
           message:"Could not delete User with id="+id
       });
   });
}