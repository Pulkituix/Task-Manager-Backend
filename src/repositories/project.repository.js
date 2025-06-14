import db from "../models/index.js";
import { Op } from "sequelize";

export async function createProject(data){
  return await db.Project.create(data);
};

// Example repository function
// export async function createProjectRepo (data) {
//   try {
//     const project = await db.Project.create(data);
//     return project;
//   } catch (error) {
//     console.error('❌ Sequelize Error Message:', error.message);
//     throw error;
//   }
// };
export async function getProjectsByUser(userId) {
  return await db.Project.findAll({ where: { createdBy: userId , isDeleted : false} });
};

export async function getProjectById(id, userId) {
  return await db.Project.findOne({ where: { id, createdBy: userId , isDeleted : false} });
};

export async function updateProject(id, data, userId){
  return await db.Project.update(data, { where: { id, createdBy: userId , isDeleted : false} });
};

export async function findProjectByIdAndUser(projectId, userId){
  return await db.Project.findOne({
    where: {
      id: projectId,
      createdBy: userId,
      isDeleted: false,
    },
  });
};

export async function softDelete(project){
    project.isDeleted = true;
    return await project.save();
};

export async function getUserProjects(userId){
    return await db.Project.findAll({
    where: {
      isDeleted: false,
      [Op.or]: [
        { createdBy: userId },
        {'$projectMembers.projectMember$': userId}
      ]
    },
    include: [
      {
        model: db.ProjectMember,
        as: 'projectMembers',
        where: {isDeleted: false},
        required: false
      }
    ]
  });
}

// export async function getProjectByTitle(userId, title){
//     return await db.Project.findAll({
//         where : {
//           isDeleted : false,
//           title : {[Op.iLike] : `%${title}%`},
//           [Op.or] : [
//             {createdBy : userId},
//             {
//               id: {
//                 [Op.in] : db.sequelize.literal(`(
//                   SELECT "projectId" FROM "ProjectMembers3"
//                   WHERE "projectMember" = ${userId} AND "isDeleted" = false
//                 )`)
//               }
//             }
//           ]
//         }
//       });
// }

export async function getProjectByTitle(userId, title, projectId){
  const whereClause = {
    isDeleted : false,
    [Op.or] : [
      {createdBy : userId},
      {'$projectMembers.projectMember$' : userId}
    ]
  };

  if(title){
    whereClause.title = {[Op.iLike] : `%${title}%`};
  }

  if(projectId){
    whereClause.id = projectId;
  }

  const projects = await db.Project.findAll({
    where : whereClause,
    include : [{
      model : db.ProjectMember,
      as : 'projectMembers',
      where : {isDeleted : false},
      required : false
    }]
  });

  return projects;
}