const express = require('express')
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const Course = require('../models/course');
const Video = require('../models/videos');
const checkUser = require('../middleware/checkUserandCourse');


// get all courses
router.get("/", authenticateToken, async (req, res) => {
    try {
        const courses = await Course.find().populate('user');
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get all videos in course
router.get("/:id/videos", authenticateToken, async (req, res) => {
    try {
        const videos = await Video.find({ course: req.params.id });
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// add new course 
router.post("/", authenticateToken, async (req, res) => {
    try {
        const course = new Course({
            title: req.body.title,
            description: req.body.description,
            time: req.body.time,
            user: req.user._id,
        });

        await course.save();

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//edit course
router.put('/:id', authenticateToken, checkUser, async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//delete course 
router.delete('/:id', authenticateToken, checkUser, async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


module.exports = router;