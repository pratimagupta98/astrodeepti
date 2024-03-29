const express = require("express");
const router = express.Router();


const {
    goLiveStreaming,
    LiveAstrologer,
    discloseLiveStream,
    tokenGenLveStreaming

} = require("../controller/yog_liveStream");



router.post("/user/goLiveStreaming", goLiveStreaming);
router.post("/user/tokenGenLveStreaming", tokenGenLveStreaming);

router.get("/user/LiveAstrologer", LiveAstrologer);
// router.get("/admin/getone_event/:id", getone_event);
router.get("/user/discloseLiveStream/:astroId", discloseLiveStream);
// router.get("/admin/dlt_event/:id", dlt_event);

module.exports = router;

