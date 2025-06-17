import * as permissionRepository from '../repositories/permission.repository.js';

export const createPermission = async (data) => {
  return await permissionRepository.createPermission(data);
};

export const getAllPermissions = async () => {
  return await permissionRepository.fetchAllPermissions();
};

export const getPermissionById = async (id) => {
  const permission = await permissionRepository.findPermissionById(id);
  if (!permission) throw new Error('Permission not found');
  return permission;
};

export const updatePermission = async (id, data) => {
  const permission = await permissionRepository.findPermissionById(id);
  if (!permission) throw new Error('Permission not found');
  await permissionRepository.updatePermission(id, data);
  return await permissionRepository.findPermissionById(id);
};

export const deletePermission = async (id) => {
  const permission = await permissionRepository.findPermissionById(id);
  if (!permission) throw new Error('Permission not found');
  await permissionRepository.softDelete(id);
};