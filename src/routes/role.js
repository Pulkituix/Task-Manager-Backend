import express from 'express';
import * as RoleController from '../controllers/roleControllers.js';

const router = express.Router();

router.post('/add', RoleController.createRole);
router.put('/update/:id', RoleController.updateRole);
router.get('/getAll', RoleController.getAllRoles);
router.delete('/delete/:id', RoleController.deleteRole);

export default router;