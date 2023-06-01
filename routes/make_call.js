const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const agora = require('agora-access-token');

const {
    make_call, callStatus, call_Status, astroVideoCall, userVideoCall, Calling, astroCallHistory, userCallHistory

} = require("../controller/make_call");



router.post("/user/make_call", make_call);
router.get("/user/callStatus/:sid", callStatus);
router.get("/user/call_Status", call_Status);
router.post("/user/astroVideoCall", astroVideoCall);
router.post("/user/userVideoCall", userVideoCall);
router.post("/user/userVideoCall", userVideoCall);
router.post("/user/Calling", Calling);
router.get("/user/astroCallHistory/:id", astroCallHistory);
router.get("/user/userCallHistory/:id", userCallHistory);




//const agora = require('agora-access-token');





module.exports = router;
