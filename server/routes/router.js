const express=require('express');
const route=express.Router();

const services=require('../services/render');
const profilecontroller = require('../controller/profileController');
const linkcontroller=require('../controller/linkController');
const handlescontroller = require('../controller/handlesController');
const { checkUser, requireAuth } = require('../../middleware/authMiddleware');
const upload = require('../../middleware/upload');


const {initPayment, responsePayment} = require("../../paytm/services/index");
const Account = require('../../models/account');
const Transaction = require('../../models/transaction');


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


// ==== Payment Routes =====


// route.get('/subscription) for pricing page

route.get('/subscription/activate',async (req,res)=>{

    if(!res.locals.myuserid){
        res.send('Something went wrong'); return;
    }

    //Rs 350
    initPayment('350',req,res).then(
      async success => {
          console.log(success);
          const txn = await Transaction.create({orderid:success.ORDER_ID,userid:res.locals.myuserid});
          if(txn)
          {
            res.render("payment/paytmRedirect.ejs", {
                resultData: success,
                paytmFinalUrl: process.env.PAYTM_FINAL_URL
            });
          }
          else
          {
              res.send("Failed Try Again Later!");
          }
      },
      error => {
          res.send(error);
      }
    );
});


route.post("/subscription/transaction",(req,res)=>{

    console.log("========= POST /paywithpaytmresponse ========");
    console.log(req.params);
    console.log(req.body);
    
  
    responsePayment(req.body).then(
        async success => {
            console.log(success);
            console.log(success.ORDERID);
            if(success.RESPCODE === '01')
            {
                //Payment Success. Activate User to Pro Subscription
                
                //FIND User from Order
                const txn = await Transaction.findOne({orderid:success.ORDERID});
                console.log(txn);
                console.log(txn.userid);
                const prousr = txn.userid;
                const usrtypechng = await Account.updateOne({_id:prousr},{subscription:'pro'});
                if(usrtypechng.ok==1)
                {
                    //User changed to PRO
                    res.render("payment/response.ejs", {resultData: "true", responseData: success});
                }
                else
                {
                    res.render("Something Went Wrong Try Again Later");
                }
            }
            else
            {
                //Transaction Failed or Still Processing
                res.render("payment/response.ejs", {resultData: "true", responseData: success});
            }
        },
        error => {
            res.send(error);
        }
    );
  });





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