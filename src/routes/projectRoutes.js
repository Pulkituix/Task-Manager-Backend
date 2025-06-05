import express from 'express';
import {create, getAll, getOne, update, remove, getMyProjects} from '../controllers/projectController.js';
import { authenticate } from '../middlewares/authMiddleware.js'
import { isProjectCreator, canUpdateProject } from '../middlewares/projectAuthMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/create', create);
router.get('/getAll', getAll);
router.get('/getOne/:id', getOne);
router.put('/update/:id', canUpdateProject, update);
router.delete('/remove/:id', isProjectCreator, remove);
router.get('/myProjects', getMyProjects);

export default router;