import express from 'express';
import {create, getAll, remove} from '../controllers/projectMemberController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { isProjectCreator , isProjectCreator2} from '../middlewares/projectAuthMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/addProjectMember', isProjectCreator2, create);
router.get('/getMembersByProject/:projectId', getAll);
router.delete('/removeMembersbyProject/:projectId/:memberId', isProjectCreator, remove);

export default router;