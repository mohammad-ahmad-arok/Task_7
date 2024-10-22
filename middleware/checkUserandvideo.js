const Course = require('../models/course');
const Video = require('../models/videos');

const checkUserandVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        const course = await Course.findById(video.course);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (course.user.toString() === req.user._id.toString()) {
            next();
        } else {
            res.status(403).json({ message: "You do not have permission to perform this action" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = checkUserandVideo;
