import * as RoleRepository from '../repositories/role.repository.js';

export async function addRole(name) {
    return await RoleRepository.createRole({name});
}

export async function updateRoleById(id, name){
    const role = await RoleRepository.findRoleById(id);
    if(!role) throw new Error('Role not found');

    const updated = await RoleRepository.updateRole(id,name);

    if(updated == 0){
        throw new Error('Role update failed');
    }

    return RoleRepository.findRoleById(id);
}

export async function getRoles() {
    return await RoleRepository.getAllRoles();
}

export async function getRoleById(id) {
    return await RoleRepository.findRoleById(id);
}

export async function deleteRoleById(id) {
    const role = await RoleRepository.findRoleById(id);
    if(!role) throw new Error('Role not found');

    await RoleRepository.deleteRole(id);
    return{message : 'Role deleted successfully'};
}