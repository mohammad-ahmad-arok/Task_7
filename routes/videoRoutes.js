const express = require('express')
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const checkUser = require('../middleware/checkUserandCourse');
const Video = require('../models/videos');
const Comment = require('../models/comment');
const checkUserandVideo = require('../middleware/checkUserandvideo');


// get all comments in video
router.get("/:id/comments", authenticateToken, async (req, res) => {
    try {
        const comments = await Comment.find({ video: req.params.id }).populate('user').populate('video');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// add videos to course
router.post("/:id", authenticateToken, checkUser, async (req, res) => {

    try {
        const video = new Video({
            title: req.body.title,
            description: req.body.description,
            course: req.params.id,
            user: req.user._id,
        });

        await video.save();

        res.status(201).json(video);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete video 
router.delete('/:id', authenticateToken, checkUserandVideo, async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        res.status(200).json({ message: "Video deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//edit video
router.put('/:id', authenticateToken, checkUserandVideo, async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!video) {
            return res.status(404).json({ message: "video not found" });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


module.exports = router;