const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const agora = require('agora-access-token');

const {
    make_call, callStatus, call_Status,astroVideoCall

} = require("../controller/make_call");





router.post("/user/make_call", make_call);
router.get("/user/callStatus", callStatus);
router.get("/user/call_Status", call_Status);
router.post("/user/astroVideoCall", astroVideoCall);


//const agora = require('agora-access-token');
 




module.exports = router;
