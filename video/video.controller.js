const VideoService = require("./video.service")
exports.addVideo = (req, res) => {
    console.log("data received in body", req.body)
    VideoService.createVideo(req.body).then((result) => {
        res.send({
            message: "Video Added"
        })
    }).catch((error) => {
        res.status(500).send()
    })
}

exports.getVideodetails = (req, res) => {
    VideoService.getVideoDetails(req.params).then((result) => {
        res.send({
            data: result
        })
    }).catch((error) => {
        res.status(500).send()
    })
}


exports.getAllVideos = (req, res) => {
    VideoService.allVideos().then((result) => {
        res.send({
            videos: result
        })
    }).catch((error) => {
        res.status(500).send()
    })
}