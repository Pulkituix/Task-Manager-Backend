import db from '../models/index.js';

export async function createPermission(data){
  return await db.Permission.create(data);
};

export async function fetchAllPermissions(){
  return await db.Permission.findAll({ where: { isDeleted: false } });
};

export async function findPermissionById(id){
  return await db.Permission.findOne({ where: { id, isDeleted: false } });
};

export async function updatePermission(id, data){
  return await db.Permission.update(data, { where: { id, isDeleted: false } });
};

export async function softDelete(id){
  return await db.Permission.update({ isDeleted: true }, { where: { id } });
};