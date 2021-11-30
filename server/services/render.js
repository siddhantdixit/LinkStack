const axios=require('axios');
const { getAPIHostURL } = require('../../config');


exports.homeRoutes=(req,res)=>{
// Make a get request to /api/uers
    axios.get(`${getAPIHostURL(req)}/dashboard/api/users`)
    .then(function(response){
        res.render('dashboard/index.ejs',{users:response.data});
    })
    .catch(err=>{
        res.send(err);
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