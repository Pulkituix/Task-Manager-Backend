import * as memberRepo from '../repositories/projectMember.repository.js';

export async function addProjectMember(data){
  return await memberRepo.addProjectMember(data);
};


export async function getMembersByProject(projectId){
  return await memberRepo.getMembersByProject(projectId);
};

export async function removeProjectMember(projectId, memberId){
  const member = await memberRepo.removeProjectMember(projectId,memberId);

  if (!member) return null;

  return await memberRepo.softDelete(member);
};