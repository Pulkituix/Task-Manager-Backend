import db from '../models/index.js';

export async function findProjectById(projectId){
    return await db.Project.findOne({
    where: { id: projectId, isDeleted: false },
  });
}

export async function findProjectMember(projectId, assignedToId) {
    return await db.ProjectMember.findOne({
    where: { projectId, projectMember: assignedToId, isDeleted: false },
  });
}

export async function createTask(data) {
    return await db.Task.create(data);
}

export async function getTaskById(taskId) {
    return await db.Task.findOne({where : {id : taskId, isDeleted : false}});
}

export async function updateTask(taskId, updates) {
    const [count, [updatedTask]] = await db.Task.update(updates, {
    where: { id: taskId },
    returning: true,
  });
  return {count, updatedTask};
}

export async function softDelete(task) {
    task.isDeleted = true;
    return await task.save();
};

export async function isUserMember(projectId, userId) {
    return await db.ProjectMember.findOne({
        where : {
            projectId, projectMember : userId, isDeleted : false
        }
    });
}

export async function findTasks(projectId) {
    return await db.Task.findAll({
        where : {
            projectId,
            isDeleted : false
        }
    });
}

export async function activeProjectMember(projectId, memberId) {
    return await db.ProjectMember.findOne({where : {
        projectId, projectMember : memberId, isDeleted : false
    }});
}

export async function taskByProjectAndMember(projectId, memberId) {
    return await db.Task.findAll({where : {
        projectId, assignedToId : memberId, isDeleted : false
    }});
}