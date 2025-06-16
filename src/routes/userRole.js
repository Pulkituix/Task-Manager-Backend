import express from 'express';
import * as userRoleController from '../controllers/userRoleController.js';

const router = express.Router();

router.post('/assign', userRoleController.assignRoleToUser);
router.delete('/remove', userRoleController.removeUserRole);
router.get('/getUserRoles/:userId', userRoleController.getUserRoles);

export default router;