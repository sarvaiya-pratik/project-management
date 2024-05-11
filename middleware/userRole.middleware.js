import pool from "../db/connectDb.js";


export const userRole = (myrole) => {

    return async (req, res, next) => {
        const userId = req.user;
        if (!userId) {
            return res.status(401).json({ succes: false, message: "You have't permission!" })
        }

        const user = await pool.query(
            "SELECT role FROM users WHERE user_id = $1", [userId]
        )

        if (user.rows[0].role === myrole) {
            next()
        }
        else {

            return res.status(401).json({ succes: false, message: "You have't permission!" })
        }
    }
}