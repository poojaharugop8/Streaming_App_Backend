const VideoModel = require("./video.model");

exports.createVideo = (data) => {
    return new Promise((resolve, reject) => {
        console.log("Data received for creating video", data)
        data.videoid = Math.floor(100000000 + Math.random() * 900000000) + Date.now()
        console.log("checking video id for a record", data.videoid)
        var videodata = new VideoModel(data)
        videodata.save().then((result) => {
            console.log("resukt of saving video into db", result)
            resolve(result)
        }).catch((error) => {
            reject()
            console.log("Error in saving video into db", error)
        })
    })
}
exports.getVideoDetails = (data) => {
    return new Promise((resolve, reject) => {
        var queryObj = {
            videoid: data.videoid
        }
        VideoModel.findOne(queryObj).then((result) => {
            resolve(result)
        }).catch((error) => {
            reject(error)
        })
    })
}

exports.allVideos = () => {
    return new Promise((resolve, reject) => {
        VideoModel.find({}).then((result) => {
            resolve(result)
        }).catch((error) => {
            reject(error)
        })
    })
}