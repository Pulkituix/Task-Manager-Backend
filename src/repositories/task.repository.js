import { update } from '../controllers/projectController.js';
import db from '../models/index.js';

export const findProjectById = async(projectId) => {
    return await db.Project.findOne({
    where: { id: projectId, isDeleted: false },
  });
}

export const findProjectMember = async(projectId, assignedToId) => {
    return await db.ProjectMember.findOne({
    where: { projectId, projectMember: assignedToId, isDeleted: false },
  });
}

export const createTaskRepo = async(data) => {
    return await db.Task.create(data);
}

export const getTaskByIdRepo = async(taskId) => {
    return await db.Task.findOne({where : {id : taskId, isDeleted : false}});
}

export const updateTaskRepo = async(taskId, updates) => {
    const [count, [updatedTask]] = await db.Task.update(updates, {
    where: { id: taskId },
    returning: true,
  });
  return {count, updatedTask};
}

export const softDelete = async(task) => {
    task.isDeleted = true;
    return await task.save();
};

export const isUserMember = async(projectId, userId) => {
    return await db.ProjectMember.findOne({
        where : {
            projectId, projectMember : userId, isDeleted : false
        }
    });
}

export const findTasks = async(projectId) => {
    return await db.Task.findAll({
        where : {
            projectId,
            isDeleted : false
        }
    });
}

export const activeProjectMember = async(projectId, memberId) => {
    return await db.ProjectMember.findOne({where : {
        projectId, projectMember : memberId, isDeleted : false
    }});
}

export const taskByProjectAndMember = async(projectId, memberId) => {
    return await db.Task.findAll({where : {
        projectId, assignedToId : memberId, isDeleted : false
    }});
}