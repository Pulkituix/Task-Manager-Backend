import * as permissionService from '../services/permission.services.js';

export const createPermission = async (req, res) => {
  try {
    const { name, description } = req.body;
    const permission = await permissionService.createPermission({ name, description });
    return res.status(201).json({ permission });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAllPermissions = async (req, res) => {
  try {
    const permissions = await permissionService.getAllPermissions();
    return res.status(200).json({ permissions });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPermissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await permissionService.getPermissionById(id);
    return res.status(200).json({ permission });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export const updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPermission = await permissionService.updatePermission(id, req.body);
    return res.status(200).json({ updatedPermission });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export const deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    await permissionService.deletePermission(id);
    return res.status(200).json({ message: 'Permission soft-deleted successfully' });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};