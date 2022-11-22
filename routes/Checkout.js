const express = require("express");
const router = express.Router();
 

const {
    addtoCart,
    getoneCart,
    all_transaction_list,
    completed_order
    // faq_list,
    // editprofile,
    // dltFaq
   
} = require("../controller/Checkout");

 
 
 router.post("/user/addtoCart", addtoCart);
router.get("/user/getoneCart/:id", getoneCart);
router.get("/admin/all_transaction_list", all_transaction_list);

// router.get("/admin/dltFaq/:id", dltFaq);
 router.get("/user/completed_order", completed_order);


module.exports = router;

