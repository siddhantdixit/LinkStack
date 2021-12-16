const express=require('express');
const route=express.Router();

const services=require('../services/render');
const profilecontroller = require('../controller/profileController');
const linkcontroller=require('../controller/linkController');
const handlescontroller = require('../controller/handlesController');
const { checkUser, requireAuth } = require('../../middleware/authMiddleware');
const upload = require('../../middleware/upload');

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

route.get('/appearance',services.appearance);


route.get('/handles',services.handles);



// Profile API (Title, Bio)
route.get('/api/profile',profilecontroller.getProfile);
route.put('/api/profile', upload.single("file"), profilecontroller.updateProfile);
// Links API
route.post('/api/links',linkcontroller.create);
route.get('/api/links',linkcontroller.find);
route.put('/api/links/:id',linkcontroller.update);
route.delete('/api/links/:id',linkcontroller.delete);

// Handles API

route.get('/api/handles',handlescontroller.getHandles);
route.post('/api/handles',handlescontroller.updateHandles);

 module.exports=route