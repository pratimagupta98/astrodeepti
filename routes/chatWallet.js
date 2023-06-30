const express = require("express");
const router = express.Router();

const {
    addChatWallet,
    getOne_Conversation_Wallet,
    addCallWallet,
    addVideoCallWallet,
    acceptChat,
    ChatWaiting,
    wait_queue_list,
    accepted_notification,
    dltMany
    //   addCallWallet_new

} = require("../controller/chatWallet");

//Paths
router.post("/user/addChatWallet", addChatWallet);
router.get("/user/getOne_Conversation_Wallet/:id", getOne_Conversation_Wallet);
router.post("/user/addCallWallet", addCallWallet);
router.post("/user/addVideoCallWallet", addVideoCallWallet);
router.post("/user/acceptChat/:id", acceptChat);
router.get("/user/ChatWaiting/:id", ChatWaiting);
router.get("/user/wait_queue_list/:id", wait_queue_list);
router.get("/user/accepted_notification/:id", accepted_notification);

router.get("/admin/dltMany", dltMany);








module.exports = router;
