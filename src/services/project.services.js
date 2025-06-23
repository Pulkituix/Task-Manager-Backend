import * as projectRepo from '../repositories/project.repository.js'

export async function createProject(data){
  return await projectRepo.createProject(data);
};

// export async function getProjectsByUser(userId){
//   return await projectRepo.getProjectsByUser(userId);
// }

export async function getProjectById(id){
  return await projectRepo.getProjectById(id)
};

export async function getAllProjects() {
    return await projectRepo.getAllProjects();
}

export async function updateProject(id, data){
  return await projectRepo.updateProject(id, data)
};

export async function deleteProject(projectId){
  try {
    const project = await projectRepo.getProjectById(projectId);
    if (!project) return null;

    await projectRepo.softDelete(project);

    return{status : 200, message : "Project Deleted"}
  } catch (error) {
    return{status : 500, message : 'Internal error server'}
  }
};


export async function getUserProjects(userId){
  return await projectRepo.getUserProjects(userId);
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

export async function searchProjects(userId, title){
  if(!userId || !title) throw new Error('UserID and title are required');

  return await projectRepo.getProjectByTitle(userId, title);
};