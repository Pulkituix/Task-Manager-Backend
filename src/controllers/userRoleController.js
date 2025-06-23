import * as userRoleService from '../services/userRole.services.js';

export async function assignRoleToUser(req, res) {
    try {
        const {userId, roleId} = req.body;

        const assigned = await userRoleService.assignRoleToUser(userId, roleId);
        return res.status(201).json(assigned);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }x
}

export async function removeUserRole(req, res) {
    try {
        const {userId, roleId} = req.body;

        const removed = await userRoleService.removeRole(userId, roleId);
        return res.status(201).json(removed);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getUserRoles(req, res) {
    try {
        const {userId} = req.params;
        const roles = await userRoleService.getUserRoles(userId);
        return res.status(200).json({ roles });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}