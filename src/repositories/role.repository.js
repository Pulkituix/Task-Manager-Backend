import db from '../models/index.js';

export async function createRole(data) {
    return await db.Role.create(data);
}

export async function findRoleById(id){
    return await db.Role.findByPk(id);
}

export async function updateRole(id,data) {
    const [updated] = await db.Role.update(data, {where : {id}});

    return updated;
}

export async function getAllRoles() {
    return await db.Role.findAll();
}

export async function deleteRole(id) {
    return await db.Role.destroy({where : {id}});
}