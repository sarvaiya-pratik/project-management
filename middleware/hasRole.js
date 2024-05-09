import { User } from "../models/user.model.js";

export const hasRole = (role) => {

    return async (req, res, next) => {
        const userId = req.user;
        if (!userId) {
            return res.status(401).json({ succes: false, message: "You have't permission!" })
        }
        const user = await User.findById(userId._id);
        console.log(role);
        if (user.role === role) {
            next()
        }
        else {

            return res.status(401).json({ succes: false, message: "You have't permission!" })
        }
    }
}