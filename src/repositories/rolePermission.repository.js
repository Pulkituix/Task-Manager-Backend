import db from '../models/index.js';

export async function addPermissionsToRole(role, permission) {
    return await role.addPermission(permission);
}

export async function getRoleById(roleId) {
    return await db.Role.findByPk(roleId);
}

export async function getPermissionById(permissionId) {
    return await db.Permission.findByPk(permissionId);
}

export async function removePermissionsFromRole(role, permission) {
    return await role.removePermission(permission);
}

export async function getRolePermissions(roleId) {
    return await db.Role.findByPk(roleId, {include : db.Permission});
}