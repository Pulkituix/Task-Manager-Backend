import db from '../models/index.js'

export async function addProjectMember(data) {
    try {
        return await db.ProjectMember.create(data);
    } catch (err) {
        console.error('Error adding project member:', err); // Log the error
        throw err;
    }
};

export async function getMembersByProject(projectId) {
  return await db.ProjectMember.findAll({
    where: { projectId, isDeleted: false },
  });
};

export async function removeProjectMember(projectId, memberId) {
  return await db.ProjectMember.findOne({
    where: {
      projectId,
      projectMember: memberId,
      isDeleted: false,
    },
  });
}

export async function softDelete (member) {
    member.isDeleted = true;
    return await member.save();
};