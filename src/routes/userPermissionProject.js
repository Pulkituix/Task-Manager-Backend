import express from 'express';
import * as userPermissionController from '../controllers/userPermissionProjectControllers.js';

const router = express.Router();

router.post('/assign', userPermissionController.addUserPermission);
router.get('/getAll', userPermissionController.getUserPermissions);
router.put('/update/:id', userPermissionController.updateUserPermission);
router.delete('/delete/:id', userPermissionController.deleteUserPermission);
router.get('/get/:id', userPermissionController.getUserPermissionById);
router.get('/getByProject/:projectId', userPermissionController.getPermissionsByProjectId);
router.get('/getByUser/:userId', userPermissionController.getPermissionsByUserId);

export default router;