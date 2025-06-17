import * as userRoleRepository from '../repositories/userRole.repository.js';

export async function assignRoleToUser(userId, roleId) {
    const user = await userRoleRepository.findUserById(userId);
    const role = await userRoleRepository.findRoleById(roleId);

    if(!user || !role) throw new Error('User or Role not found');

    await userRoleRepository.addRoleToUser(user, role);

    return{message : 'Role assigned to user successfully'};
}

export async function removeRole(userId,roleId) {
    const user = await userRoleRepository.findUserById(userId);
    const role = await userRoleRepository.findRoleById(roleId);

    if(!user || !role) throw new Error('User or Role not found');

    await userRoleRepository.removeRoleFromUser(user, role);

    return{message : 'Role removed from user successfully'};
}

export async function getUserRoles(userId) {
    const user = await userRoleRepository.getUserRoles(userId);
    if (!user) throw new Error('User not found');

    return user.Roles;
}