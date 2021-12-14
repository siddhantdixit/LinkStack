const express=require('express');
const route=express.Router();

const services=require('../services/render');
const linkcontroller=require('../controller/linksController');
const profilecontroller = require('../controller/profileController');
const { checkUser, requireAuth } = require('../../middleware/authMiddleware');

/*
* @description for Root Route
* @method GET/
*/
route.all('*',requireAuth);
route.all('*',checkUser);

route.get('/',services.homeRoutes);

/*
* @description for add links
* @method GET/add-link
*/
route.get('/add-link',services.add_user);

/*
* @description for update links
* @method GET/update-link
*/
route.get('/update-link',services.update_user);


route.get('/handles',services.handles);


// Links API
route.post('/api/links',linkcontroller.create);
route.get('/api/links',linkcontroller.find);
route.put('/api/links/:id',linkcontroller.update);
route.delete('/api/links/:id',linkcontroller.delete);


// Profile API (Title, Bio)
route.get('/api/profile',profilecontroller.getProfile);
route.put('/api/profile',profilecontroller.updateProfile);

 module.exports=route