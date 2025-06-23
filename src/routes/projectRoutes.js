import express from 'express';
import {create, getAll, getOne, update, remove, getMyProjects, searchProjects} from '../controllers/projectController.js';
import { authenticate } from '../middlewares/authMiddleware.js'
import { isProjectCreator, canUpdateProject } from '../middlewares/projectAuthMiddleware.js';
import { checkPermission } from '../middlewares/checkPermission.js'

const router = express.Router();

router.use(authenticate);

router.post('/create', checkPermission, create);
router.get('/getAll', checkPermission, getAll);
router.get('/getOne/:id', checkPermission, getOne);
router.put('/update/:id', checkPermission, update);
router.delete('/remove/:id', checkPermission,remove);
router.get('/myProjects', getMyProjects);
router.get('/search', searchProjects);


export default router;