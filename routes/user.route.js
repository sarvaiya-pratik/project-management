import express from "express";
import { getAllUser, loginUser, registerUser, updateUser } from "../controllers/user.controller.js";
const router = express.Router();

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
 *         _id:
 *           type: objectId
 *           description: The auto-generated id of the User
 *         name:
 *           type: string
 *           description: The name of User
 *         email:
 *           type: string
 *           description: The Email of User
 *         password:
 *           type: string
 *           description: password of user
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was last updated
 *       example:
 *         _id: d5fE_asz
 *         name: Pratik Sarvaiya
 *         email: pratik123@gmail.com
 *         role: "user"
 *         password: 0000
 *         createdAt: 2024-05-08T04:48:59.667+00:00
 *         updatedAt: 2024-05-08T09:38:29.807+00:00
 * 
 *       
 *     
 */

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
 *               $ref: '#/components/schemas/User'
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
