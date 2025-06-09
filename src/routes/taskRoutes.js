import express from 'express';
import {createTask, getTaskById, updateTask, deleteTask, getTaskByProjectId, getAssignedTask} from '../controllers/taskController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/createTask', createTask);
router.get('/getTask/:id', getTaskById);
router.put('/updateTask/:id', updateTask);
router.delete('/removeTask/:id', deleteTask);
router.get('/projectTasks/:id', getTaskByProjectId);
router.get('/project/:projectId/member/:memberId', getAssignedTask);

export default router;