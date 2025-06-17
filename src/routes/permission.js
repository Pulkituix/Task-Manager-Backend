import express from 'express';
import * as permissionController from '../controllers/permissionController.js';

const router = express.Router();

router.post('/add', permissionController.createPermission);
router.get('/getAll', permissionController.getAllPermissions);
router.get('/get/:id', permissionController.getPermissionById);
router.put('/update/:id', permissionController.updatePermission);
router.delete('/delete/:id', permissionController.deletePermission);

export default router;