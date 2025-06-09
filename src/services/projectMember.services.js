import db from '../models/index.js';

export const addProjectMember = async (data) => {
  try {
    return await db.ProjectMember.create(data);
  } catch (err) {
    console.error('Error adding project member:', err); // Log the error
    throw err;
  }
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