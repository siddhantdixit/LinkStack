const axios=require('axios');
const { getAPIHostURL } = require('../../config');
var Userdb=require('../model/model');


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


    Userdb.find()
    .then(user=>{
        res.render('dashboard/mailverification.ejs',{users:user});
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Error Occurred while retriving user information"})
    })
}

exports.add_user=(req,res)=>{
    res.render('dashboard/add_user.ejs');
}

exports.update_user=(req,res)=>{
    axios.get(`${getAPIHostURL(req)}/dashboard/api/users`,{params:{id:req.query.id}})
      .then(function(userdata){
          res.render("dashboard/update_user.ejs",{user:userdata.data})
      })
    .catch(err=>{
        res.send(err);
    })
}