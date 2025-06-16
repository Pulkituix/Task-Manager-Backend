import db from '../models/index.js';

export async function findUserById(userId) {
    return await db.User.findByPk(userId);
}

export async function findRoleById(roleId) {
    return await db.Role.findByPk(roleId);
}

export async function addRoleToUser(user,role) {
    return await user.addRole(role);
}

export async function removeRoleFromUser(user,role) {
    return await user.removeRole(role);
}

export async function getUserRoles(userId) {
    return await db.User.findByPk(userId, {include : db.Role});
}