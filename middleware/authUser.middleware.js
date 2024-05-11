import pool from "../db/connectDb.js";
import { getUserByToken } from "../utilities/tokenProvider.util.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({ success: false, message: "Unauthorized" });
    }
    const userId = await getUserByToken(token);

    if (!userId) {
      return res.status(404).json({ success: false, message: "user not found" });
    }

    const user = await pool.query("SELECT * from users WHERE user_id = $1", [userId._id])
    req.user = user.rows[0].user_id;

    next();
  } catch (error) {
    console.log(error)
  }
};
