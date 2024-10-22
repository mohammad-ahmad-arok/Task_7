const Course = require('../models/course');

const checkUser = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "course not found" });
        }

        if (course?.user?.toString() == req.user._id.toString()) {
            next();
        } else {
            res.status(403).json({ message: "You do not have permission to perform this action" });
        }

    } catch (error) {
        res.status(401).json({ message: "You need to be authenticated to access this resource" });
    }
};

module.exports = checkUser;