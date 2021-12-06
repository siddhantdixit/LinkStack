const express=require('express');
const route=express.Router();

const services=require('../services/render');
const controller=require('../controller/controller');
const { checkUser, requireAuth } = require('../../middleware/authMiddleware');

/*
* @description for Root Route
* @method GET/
*/
route.all('*',requireAuth);
route.all('*',checkUser);

route.get('/',services.homeRoutes);

/*
* @description for add users
* @method GET/add-link
*/
route.get('/add-link',services.add_user);

/*
* @description for update users
* @method GET/update-link
*/
route.get('/update-link',services.update_user);


route.get('/handles',services.handles);


// API
route.post('/api/links',controller.create);
route.get('/api/links',controller.find);
route.put('/api/links/:id',controller.update);
route.delete('/api/links/:id',controller.delete);


 module.exports=route