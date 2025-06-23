import * as RoleServices from '../services/role.services.js';

export async function createRole(req,res) {
    try{
        const {name} = req.body;
        const role = await RoleServices.addRole(name);
        console.log("kjefhghvrcvebfurvg erj")
        return res.status(201).json(role);
    }
    catch(error){
        return res.status(500).json({error : error.message});
    }
}

export async function updateRole(req,res){
    try {
        const {id} = req.params;
        const {name} = req.body;

        if(!name){
            return res.status(400).json({error : 'Role name is required'})
        }

        const updateRole = await RoleServices.updateRoleById(id,{name});
        return res.status(200).json(updateRole);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function getAllRoles(req, res) {
    try {
        const roles = await RoleServices.getRoles();
        return res.status(200).json(roles);
    } catch (error) {
        return res.status(500).json({error : error.message});
    }
}

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await RoleServices.deleteRoleById(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};