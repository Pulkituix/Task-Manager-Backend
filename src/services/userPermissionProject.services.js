import * as userPermissionRepository from '../repositories/userPermissionProject.repository.js';

export async function addUserPermission(data) {
    return await userPermissionRepository.createUserPermission(data);
}

export async function getUserPermissions() {
    return await userPermissionRepository.getAllUserPermissions();
}

export async function updateUserPermission(id, data) {
    return await userPermissionRepository.updateUserPermission(id, data);
}

export async function deleteUserPermission(id) {
    return await userPermissionRepository.deleteUserPermission(id);
}

export async function findUserPermissionById(id) {
    return await userPermissionRepository.findUserPermissionById(id);
}

export async function getPermissionsByUserId(userId) {
    return await userPermissionRepository.getPermissionsByUserId(userId);
}

export async function getPermissionsByProjectId(projectId) {
    return await userPermissionRepository.getPermissionsByProjectId(projectId);
}