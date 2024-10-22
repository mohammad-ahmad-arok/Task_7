const Comment = require('../models/comment');

const checkUserandComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "comment not found" });
        }

        if (comment?.user?.toString() == req.user._id.toString()) {
            next();
        } else {
            res.status(403).json({ message: "You do not have permission to perform this action" });
        }

    } catch (error) {
        res.status(401).json({ message: "You need to be authenticated to access this resource" });
    }
};

module.exports = checkUserandComment;