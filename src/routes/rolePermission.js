import express from 'express';
import * as rolePermissionController from '../controllers/rolePermissionController.js';

const router = express.Router();

router.post('/assign', rolePermissionController.assignPermissionToRole);
router.delete('/remove', rolePermissionController.removePermissionsFromRole);
router.get('/getRolePermissions/:userId', rolePermissionController.getRolePermissions);

export default router;