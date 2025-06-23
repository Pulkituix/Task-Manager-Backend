import db from '../models/index.js';

export async function createUserPermission(data) {
    return await db.UserPermissionProject.create(data);
}

export async function getAllUserPermissions() {
    return await db.UserPermissionProject.findAll();
}

export async function updateUserPermission(id, data) {
    return await db.UserPermissionProject.update(data, { where: { id }, returning: true });
}

export async function deleteUserPermission(id) {
    return await db.UserPermissionProject.destroy({ where: { id } });
}

export async function findUserPermissionById(id) {
    return await db.UserPermissionProject.findByPk(id);
}

export async function getPermissionsByUserId(userId) {
    return await db.UserPermissionProject.findAll({
        where: { userId }
    });
}

export async function getPermissionsByProjectId(projectId) {
    return await db.UserPermissionProject.findAll({
        where: { projectId }
    });
}