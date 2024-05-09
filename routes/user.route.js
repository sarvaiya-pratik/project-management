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
import { authUser } from "../middleware/authUser.js";
import { hasRole } from "../middleware/HasRole.js";
const router = express.Router();

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
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

router.get('/', authUser, hasRole("admin"), getAllUser)

/**
 * @swagger

 * /auth/login:
 *   post:
 *     summary: Login the user
 *     tags: [Users]
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
 *               
 *             example:
 *               success : true
 *               message : Login succesfully !
 *       400:
 *         description: All Fields required !
 *         content:
 *           application/json:
 *             schema:
 *               
 *             example:
 *               success : false
 *               message : All fields are required !
 *       404:
 *         description: Please Register first
 *         content:
 *           application/json:
 *             schema:
 *               
 *             example:
 *               success : false
 *               message : Please Register first!
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
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               success: true
 *               message: User created
 *               data: 
 *                  _id: 663c5a6e61dda25fce36363e
 *                  name: test
 *                  role: user
 *                  email: test123@gmail.com
 *                  createdAt: 2024-05-09T05:09:02.644Z
 *                  updatedAt: 2024-05-09T05:09:02.644Z
 *       400:
 *         description: All fields are required !
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               success: false
 *               message: All fields are required !
 *       408:
 *         description: User Already Exist ! !
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               success: false
 *               message: User Already Exist ! 
 *                   
 *                
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
 *     tags: [Users]
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
 *         description: User updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               success: true
 *               message: User updated succesfully
 *       500:
 *         description: somiting went wrong !
 *
 */
router.put('/:id', updateUser)

export default router;
