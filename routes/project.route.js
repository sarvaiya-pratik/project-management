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
 *           type: objectId
 *           description: The auto-generated id of the Project
 *         name:
 *           type: string
 *           description: The name of Project
 *         members:
 *           type: aray
 *           description: The members of project
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *         updatedAt:
 *           type: string
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
 *       200:
 *         description: Task Added Succesfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       500:
 *         description: somiting went wrong !
 *
 */
router.post('/add', addProject);

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
 *         description: Project Deleted succesfully .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       500:
 *         description: somiting went wrong !
 *
 */
router.delete('/:id', deleteProject);

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
 *         description: Project Deleted succesfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       500:
 *         description: somiting went wrong !
 *
 */
router.put('/:id', updateProject);

export default router;
