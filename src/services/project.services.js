import * as projectRepo from '../repositories/project.repository.js'

export async function createProject(data){
  return await projectRepo.createProject(data);
};

export async function getProjectsByUser(userId){
  return await projectRepo.getProjectsByUser(userId);
}

export async function getProjectById(id, userId){
  return await projectRepo.getProjectById(id, userId)
};

export async function updateProject(id, data, userId){
  return await projectRepo.updateProject(id, data, userId)
};

export async function deleteProject(projectId, userId){
  try {
    const project = await projectRepo.findProjectByIdAndUser(projectId, userId)

    if (!project) return null;

    await projectRepo.softDelete(project);

    return{status : 200, message : "Project Deleted"}
  } catch (error) {
    return{status : 500, message : 'Internal error server'}
  }
};

// export async function deleteTask(taskId,userId){
//     try{
//         const task = await taskRepo.getTaskById(taskId);

//         if(!task) return {status : 404, message : 'Task not found'};

//         if(task.createdBy != userId) return {status : 403, message : "Permission denied"};

//         await taskRepo.softDelete(task);

//         return{status : 200, message : "Task deleted"};
//     }
//     catch(error){
//         console.error('Error', error);
//         return {status : 500, message : 'Internal server error'};
//     }
// }

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