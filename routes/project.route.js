import express from "express";
import { addProject, deleteProject, getAllProject, updateProject, } from "../controllers/project.controller.js";
import { hasRole } from "../middleware/HasRole.js";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - name
 *         - members
 *
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the Project
 *         name:
 *           type: string
 *           description: The name of Project
 *         members:
 *           type: array
 *           description: The members of project
 *         createdAt:
 *           type: date
 *           format: date
 *           description: The date the user was added
 *         updatedAt:
 *           type: date
 *           format: date
 *           description: The date the user was last updated
 *       example:
 *         name: Test Name
 *         members: ["663b043bb705df19ef6ab53f","663b0475b705df19ef6ab548"]
 * 
 *       
 *     
 */



/**
 * @swagger

 * /project:
 *   get:
 *     summary: Get all Projects
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: All Project fetched .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       500:
 *         description: somiting went wrong !
 *
 */
router.get('/', getAllProject);

/**
 * @swagger
 * /project/add:
 *   post:
 *     summary: add the Project 
 *     tags: [Project]
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project created !
 *         content:
 *           application/json:
 *             schema:
 *             example :
 *               success: true
 *               message: Project created !
 *               data: 
 *                  name: test
 *                  members: [e434343]
 *                  user: e2343dsfsaf
 *       400:
 *         description: All fields are required !
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               success: false
 *               message: All fields are required !             
 *       409:
 *         description: Name already exist !
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               success: false
 *               message: Name already exist !            
 *       500:
 *         description: somiting went wrong !
 *
 */
router.post('/add', hasRole("admin"), addProject);

/**
 * @swagger
 * /project/{id}:
 *   delete:
 *     summary: delete the Project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of task
 *     responses:
 *       200:
 *         description: Project Deleted !
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               success: true
 *               message: Project Deleted !              
 *       404:
 *         description: Project Not Found !
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               success: false
 *               message: Project Not Found !
 *       500:
 *         description: somiting went wrong !
 *
 */
router.delete('/:id', hasRole("admin"), deleteProject);

/**
 * @swagger

 * /project/{id}:
 *   put:
 *     summary: update Project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Project updated succesfully !
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               success: true
 *               message: Project updated succesfully ! 
 *       404:
 *         description: Project Not Found !
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               success: false
 *               message: Project Not Found !
 
 *       500:
 *         description: somiting went wrong !
 *
 */


router.put('/:id', hasRole("admin"), updateProject);
export default router;
