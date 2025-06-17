import * as rolePermissionRepository from '../repositories/rolePermission.repository.js';

export async function assignPermissionToRole(roleId, permissionId) {
    const role = await rolePermissionRepository.getRoleById(roleId);
    const permission = await rolePermissionRepository.getPermissionById(permissionId);

    if(!role || !permission) throw new Error('Role or Permission not found');

    await rolePermissionRepository.addPermissionsToRole(role, permission);

    return{message : 'Permission assigned to Role successfully'};
}

export async function removePermission(roleId,permissionId) {
    const role = await rolePermissionRepository.getRoleById(roleId);
    const permission = await rolePermissionRepository.getPermissionById(permissionId);

    if(!role || !permission) throw new Error('Role or Permission not found');

    await rolePermissionRepository.removePermissionsFromRole(role, permission);

    return{message : 'Permission removed from Role successfully'};
}

export async function getRolePermissions(roleId) {
    const role = await rolePermissionRepository.getRolePermissions(roleId);
    if (!role) throw new Error('Role not found');

    return role.Permissions;
}