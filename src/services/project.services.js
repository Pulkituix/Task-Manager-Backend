import {createProjectRepo, findProjectByIdAndUser, getProjectByIdRepo, getProjectsByUserRepo, softDelete, updateProjectRepo, getUserProjectsRepo, getProjectByTitle} from '../repositories/project.repository.js'

export const createProject = async (data) => {
  return await createProjectRepo(data);
};

export const getProjectsByUser = async (userId) => {
  return await getProjectsByUserRepo(userId);
}

export const getProjectById = async (id, userId) => {
  return await getProjectByIdRepo(id, userId)
};

export const updateProject = async (id, data, userId) => {
  return await updateProjectRepo(id, data, userId)
};

export const deleteProject = async (projectId, userId) => {
  const project = await findProjectByIdAndUser(projectId, userId)

  if (!project) return null;

  return await softDelete(project);
};

export const getUserProjects = async (userId) => {
  return await getUserProjectsRepo(userId);
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

  return await getProjectByTitle(userId, title);
};