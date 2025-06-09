import db from '../models/index.js';
import { Op } from 'sequelize';

export const createProject = async (data) => {
  return await db.Project.create(data);
};

export const getProjectsByUser = async (userId) => {
  return await db.Project.findAll({ where: { createdBy: userId , isDeleted : false} });
};

export const getProjectById = async (id, userId) => {
  return await db.Project.findOne({ where: { id, createdBy: userId , isDeleted : false} });
};

export const updateProject = async (id, data, userId) => {
  return await db.Project.update(data, { where: { id, createdBy: userId , isDeleted : false} });
};

export const deleteProject = async (projectId, userId) => {
  const project = await db.Project.findOne({
    where: {
      id: projectId,
      createdBy: userId,
      isDeleted: false,
    },
  });

  if (!project) return null;

  project.isDeleted = true;
  await project.save();
  return project;
};

export const getUserProjects = async (userId) => {
  const projects = await db.Project.findAll({
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

  return projects;
};

// export const searchProjects = async({userId, title, projectId}) => {
//   const userAccess = {
//     [Op.or] : [
//       {createdBy : userId},
//       {
//         id : {
//           [Op.in] : db.Sequelize.literal(`(
//             SELECT "projectId"
//             FROM "ProjectMembers3"
//             WHERE "projectMember" = ${userId} AND "isDeleted" = false
//           )`)
//         }
//       }
//     ]
//   };
//   const titleCondition = {
//     title : {[Op.iLike] : `%${title || ''}%`}
//   };

//   const combineConditions = {
//     isDeleted : false,
//     [Op.and] : [userAccess, titleCondition]
//   };

//   if(projectId){
//     combineConditions[Op.and].push({id : projectId});
//   };

//   return await db.Project.findAll({where : combineConditions});
// };

export const searchProjects = async(userId, title) => {
  if(!userId || !title) throw new Error('UserID and title are required');

  const projects = await db.Project.findAll({
    where : {
      isDeleted : false,
      title : {[Op.iLike] : `%${title}%`},
      [Op.or] : [
        {createdBy : userId},
        {
          id: {
            [Op.in] : db.sequelize.literal(`(
              SELECT "projectId" FROM "ProjectMembers3"
              WHERE "projectMember" = ${userId} AND "isDeleted" = false
            )`)
          }
        }
      ]
    }
  });
  return projects;
};