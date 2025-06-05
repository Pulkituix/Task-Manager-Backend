import db from '../models/index.js';

export const addProjectMember = async (data) => {
  return await db.ProjectMember.create(data);
};

export const getMembersByProject = async (projectId) => {
  return await db.ProjectMember.findAll({
    where: { projectId, isDeleted: false },
  });
};

export const removeProjectMember = async (projectId, memberId) => {
  const member = await db.ProjectMember.findOne({
    where: {
      projectId,
      projectMember: memberId,
      isDeleted: false,
    },
  });

  if (!member) return null;

  member.isDeleted = true;
  await member.save();
  return member;
};