import { addProjectMemberRepo, getMembersByProjectRepo, removeProjectMemberRepo, softDelete } from '../repositories/projectMember.repository.js';

export const addProjectMember = async (data) => {
  return await addProjectMemberRepo(data);
};


export const getMembersByProject = async (projectId) => {
  return await getMembersByProjectRepo(projectId);
};

export const removeProjectMember = async (projectId, memberId) => {
  const member = await removeProjectMemberRepo(projectId,memberId);

  if (!member) return null;

  return await softDelete(member);
};