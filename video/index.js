const Express = require("express");

const router = Express.Router();

const VideoController = require("./video.controller");



router.post("/addvideo", VideoController.addVideo)
router.get("/listall", VideoController.getAllVideos)
router.get("/getdetails/:videoid", VideoController.getVideodetails)



module.exports = router