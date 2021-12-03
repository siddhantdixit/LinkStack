const Profile = require('../../models/profile');


exports.getProfile = (req,res)=>{
    
    Profile.findOne({userid:res.locals.myuserid})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Not found user with id:"})
        }else {
            res.send({title:data.title,bio:data.bio});
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error retrieving user with id"+linkid})
    })
}


exports.updateProfile = (req,res)=>{
    const {title,bio} = req.body;
    if(!title && !bio)
    {
        res.status(400).send({message:"Content can not be empty! Need Title or Bio atleast"});
        return;
    }

    Profile.findOneAndUpdate({userid:res.locals.myuserid},{title:title,bio:bio})
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot update user. Maybe user not found!`})
            }else{
                res.send({message:"Profile Updated Successfully!"})
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error update user information"})
        })
}