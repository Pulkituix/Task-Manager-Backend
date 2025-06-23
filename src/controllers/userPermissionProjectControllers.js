import * as userPermissionService from '../services/userPermissionProject.services.js';

export async function addUserPermission(req, res) {
    try {
        const { userId, permissionId, projectId } = req.body;

        if (!userId || !permissionId || !projectId) {
            return res.status(400).json({ message: 'UserId, PermissionId and ProjectId are required' });
        }

        const userPermission = await userPermissionService.addUserPermission({ userId, permissionId, projectId });
        res.status(201).json(userPermission);
    } catch (error) {
        console.error('Error adding user permission:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getUserPermissions(req, res) {
    try {
        const userPermissions = await userPermissionService.getUserPermissions();
        res.status(200).json(userPermissions);
    } catch (error) {
        console.error('Error fetching user permissions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function updateUserPermission(req, res) {
    try {
        const { id } = req.params;
        const { userId, permissionId, projectId } = req.body;

        if (!userId || !permissionId || !projectId) {
            return res.status(400).json({ message: 'UserId, PermissionId and ProjectId are required' });
        }

        const userPermission = await userPermissionService.findUserPermissionById(id);
        if (!userPermission) {
            return res.status(404).json({ message: 'UserPermission not found' });
        }

        const [_, [updatedUserPermission]] = await userPermissionService.updateUserPermission(id, { userId, permissionId });
        res.status(200).json(updatedUserPermission);
    } catch (error) {
        console.error('Error updating user permission:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function deleteUserPermission(req, res) {
    try {
        const { id } = req.params;

        const userPermission = await userPermissionService.findUserPermissionById(id);
        if (!userPermission) {
            return res.status(404).json({ message: 'UserPermission not found' });
        }

        await userPermissionService.deleteUserPermission(id);
        res.status(200).json({ message: 'UserPermission deleted successfully' });
    } catch (error) {
        console.error('Error deleting user permission:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getUserPermissionById(req, res) {
    try {
        const { id } = req.params;

        const userPermission = await userPermissionService.findUserPermissionById(id);

        if (!userPermission) {
            return res.status(404).json({ message: 'UserPermission not found' });
        }

        res.status(200).json(userPermission);
    } catch (error) {
        console.error('Error fetching user permission by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getPermissionsByUserId(req, res) {
    try {
        const { userId } = req.params;

        const permissions = await userPermissionService.getPermissionsByUserId(userId);

        res.status(200).json(permissions);
    } catch (error) {
        console.error('Error fetching user permissions by user ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getPermissionsByProjectId(req, res) {
    try {
        const { projectId } = req.params;

        const permissions = await userPermissionService.getPermissionsByProjectId(projectId);

        res.status(200).json(permissions);
    } catch (error) {
        console.error('Error fetching user permissions by project ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}