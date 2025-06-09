import db from '../models/index.js'

export const addProjectMemberRepo = async(data) => {
    try {
        return await db.ProjectMember.create(data);
    } catch (err) {
        console.error('Error adding project member:', err); // Log the error
        throw err;
    }
};

export const getMembersByProjectRepo = async (projectId) => {
  return await db.ProjectMember.findAll({
    where: { projectId, isDeleted: false },
  });
};

export const removeProjectMemberRepo = async (projectId, memberId) => {
  return await db.ProjectMember.findOne({
    where: {
      projectId,
      projectMember: memberId,
      isDeleted: false,
    },
  });
}

export const softDelete = async(member) => {
    member.isDeleted = true;
    return await member.save();
};