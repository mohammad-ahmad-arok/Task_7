const express = require('express')
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const Comment = require('../models/comment');
const checkUserandComment = require('../middleware/checkUserandComment');


// add comment in video
router.post("/:id", authenticateToken, async (req, res) => {
    try {
        const comment = new Comment({
            comment: req.body.comment,
            user: req.user._id,
            video: req.params.id
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//edit comment
router.put('/:id', authenticateToken, checkUserandComment, async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!comment) {
            return res.status(404).json({ message: "comment not found" });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// delete comment
router.delete('/:id', authenticateToken, checkUserandComment, async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "comment not found" });
        }
        res.status(200).json({ message: "comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



module.exports = router;