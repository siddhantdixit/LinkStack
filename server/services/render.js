const axios=require('axios');
const { getAPIHostURL } = require('../../config');
const Profile = require('../../models/profile');


exports.homeRoutes=(req,res)=>{
// Make a get request to /api/uers
    // axios.get({url:`${getAPIHostURL(req)}/dashboard/api/users`,headers:{Cookie:req.headers.cookie}})
    // .then(function(response){
    //     console.log(response.data);
    //     res.render('dashboard/index.ejs',{users:response.data});
    // })
    // .catch(err=>{
    //     res.send(err);
    // })


    Profile.findOne({userid:res.locals.myuserid})
    .then(user=>{
        res.render('dashboard/index.ejs',{users:user.links});
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Error Occurred while retriving user information"})
    })
}

exports.appearance=(req,res)=>{
    res.render('dashboard/appearance.ejs')
}
exports.add_user=(req,res)=>{
    res.render('dashboard/add_user.ejs');
}

exports.update_user=(req,res)=>{

    // Profile.findOne({userid:res.locals.myuserid})
    //     .then(data=>{
    //         if(!data){
    //             res.status(404).send({message:"Not found user with id:"+linkid})
    //         }else {
    //             res.send(data.links.id(linkid));
    //         }
    //     })


    Profile.findOne({userid:res.locals.myuserid})
      .then(function(userdata){
          res.render("dashboard/update_user.ejs",{user:userdata.links.id(req.query.id)})
      })
    .catch(err=>{
        res.send(err);
    })
}