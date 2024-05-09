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
 *         title: test
 *         description: description test
 *         status: To-Do
 *         assignee: ["663b043bb705df19ef6ab53f"]
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
 *         description: The Project id
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task Added Succesfully.
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               success: true
 *               message:  Task added Succesfully !
 *       400:
 *         description: All fields are required !
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               success: false
 *               message: All fields are required !
 *       404:
 *         description: Project not found !
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               success: false
 *               message: Project not found !
 *       409:
 *         description: This title already exist !
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               success: false
 *               message: This title already exist !
 * 
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
 *             example:
 *               success: true
 *               message: Task updated succesfully !
 *       404:
 *         description: Task not found !
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               success: false
 *               message: Task not found !
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
 *         description: Task Deleted succesfully !
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Task Deleted succesfully !
 *       404:
 *         description: Task not found !
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               success: false
 *               message: Task not found !
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
 *         description: Status updated succesfully !
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               success: true
 *               message: Status updated succesfully !
 *       404:
 *         description: Task not found !
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               success: false
 *               message: Task not found !
 *       500:
 *         description: somiting went wrong !
 *
 */
router.put('/status/:id', statusChange)


export default router;
