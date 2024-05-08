/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *
 *       properties:
 *        
 *         name:
 *           type: string
 *           description: The name of User
 *         email:
 *           type: string
 *           description: The Email of User
 *         password:
 *           type: string
 *           description: password of user
 *         role:
 *           type: string
 *           description: The role of user
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was last updated
 *       example: 
 *         name: Pratik
 *         email: pratik0123@gmail.com
 *         password: "1234"
 *         role: admin
 *          
 *     
 */


import express from "express";
import { getAllUser, loginUser, registerUser, updateUser } from "../controllers/user.controller.js";
const router = express.Router();


/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Get all users
 *     tags: [Authenticate]
 *     responses:
 *       200:
 *         description: All users fetched .
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: somiting went wrong !
 *
 */

router.get('/', getAllUser)


/**
 * @swagger

 * /auth/login:
 *   post:
 *     summary: Login the user
 *     tags: [Authenticate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *               example:
 *                  email: pratik123@gmail.com
 *                  password: "0000"
 *     responses:
 *       200:
 *         description: Login succesfull.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: somiting went wrong !
 *
 */
router.post('/login', loginUser);

/**
 * @swagger

 * /auth/register:
 *   post:
 *     summary: Register the user
 *     tags: [Authenticate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login succesfull.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: somiting went wrong !
 *
 */
router.post('/register', registerUser);
/**
 * @swagger

 * /auth/{id}:
 *   put:
 *     summary: Update the user
 *     tags: [Authenticate]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login succesfull.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: somiting went wrong !
 *
 */
router.put('/:id', updateUser)

export default router;
