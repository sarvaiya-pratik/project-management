import express from "express";
import { addTask, deleteTask, getAllTask, statusChange, updateTask } from "../controllers/tasks.controller.js";
import { hasRole } from "../middleware/HasRole.js";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - status
 *         - assignee
 *         - project
 *         - dueDate
 *
 *       properties:
 *         _id:
 *           type: objectId
 *           description: The auto-generated id of the Task
 *         title:
 *           type: string
 *           description: The title of Task
 *         description:
 *           type: string
 *           description: The description of the task
 *         status:
 *           type: string
 *           description: status of the task
 *         assignee:
 *           type: string
 *           description: assignee of the task
 *         project:
 *           type: string
 *           description: project reference in the task
 *         dueDate:
 *           type: string
 *           description: due date of the task
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was last updated
 *       example:
 *         title: Pratik Sarvaiya
 *         description: pratik123@gmail.com
 *         status: To-Do
 *         assignee: harsh
 *         project: 663b4a9941e83d9f9aa218ab
 *         dueDate: 04/03/2024
 
 * 
 *       
 *     
 */



/**
 * @swagger

 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: All users fetched .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: somiting went wrong !
 *
 */
router.get('/', hasRole("admin"), getAllTask)


/**
 * @swagger

 * /tasks/{projectId}:
 *   post:
 *     summary: add the task 
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The Projet id
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task Added Succesfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: somiting went wrong !
 *
 */
router.post('/:projectId', hasRole("admin"), addTask)

/**
 * @swagger

 * /tasks/{id}:
 *   put:
 *     summary: update the task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of task
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task Updated succesfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: somiting went wrong !
 *
 */
router.put('/:id', hasRole("admin"), updateTask)

/**
 * @swagger

 * /tasks/{id}:
 *   delete:
 *     summary: delete the task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of task
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task Deleted succesfully .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: somiting went wrong !
 *
 */
router.delete('/:id', hasRole("admin"), deleteTask)

/**
 * @swagger

 * /tasks/status/{id}:
 *   put:
 *     summary: update the status of task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Login succesfull.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: somiting went wrong !
 *
 */
router.put('/status/:id', statusChange)


export default router;
