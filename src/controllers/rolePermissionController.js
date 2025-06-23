import * as rolePermissionService from '../services/rolePermission.services.js';

export async function assignPermissionToRole(req, res) {
    try {
        const {roleId, permissionId} = req.body;

        const assigned = await rolePermissionService.assignPermissionToRole(roleId, permissionId);
        return res.status(201).json(assigned);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function removePermissionsFromRole(req, res) {
    try {
        const {roleId, permissionId} = req.body;

        const removed = await rolePermissionService.removePermission(roleId, permissionId);
        return res.status(201).json(removed);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getRolePermissions(req, res) {
    try {
        const {roleId} = req.params;
        const permissions = await rolePermissionService.getRolePermissions(roleId);
        return res.status(200).json({ permissions });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}