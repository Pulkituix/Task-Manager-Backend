import db from "../models/index.js";
import { findProjectById, findProjectMember, createTaskRepo, getTaskByIdRepo, updateTaskRepo, isUserMember, findTasks, activeProjectMember, taskByProjectAndMember, softDelete } from "../repositories/task.repository.js";

export const createTaskService = async(data) => {
    const {title, description, status, projectId, assignedToId, createdBy} = data;

    const project = await findProjectById(projectId);
    if(!project) throw new Error('Project not Found');

    if(assignedToId){
        const isProjectMember = await findProjectMember(projectId, assignedToId);

        if(!isProjectMember) throw new Error('Assignee is not the member of the project');
    }

    const task = await createTaskRepo({
        title, description, status, projectId, assignedToId, createdBy
    });
    return task;
};

export const getTaskById = async(taskId, userId) => {
    const task = await getTaskByIdRepo(taskId);
    if(!task){
        return {status : 404, message : 'Task not found'}
    }

    if(task.createdBy != userId && task.assignedToId != userId){
        return {status : 403, message : 'Permission denied'}
    }

    return task;
}

export const updateTask = async(taskId, userId, updates) => {
    try {
        const task = await getTaskByIdRepo(taskId);

        if(!task){
            return {status : 404, message : 'Task not found'}
        }

        if(task.createdBy != userId && task.assignedToId != userId){
            return {status : 403, message : 'Permission denied'}
        }

        const {count, updatedTask} = await updateTaskRepo(taskId,updates)

        if(count == 0){
            return {status : 500, message : 'Failed to update'}
        }
        return {status : 200, task : updatedTask};
    } catch (error) {
        console.error('Error', error);
        return{status : 500, message : 'Error during task update'};
    }
};

export const deleteTask = async(taskId,userId) => {
    try{
        const task = await getTaskByIdRepo(taskId);

        if(!task) return {status : 404, message : 'Task not found'};

        if(task.createdBy != userId) return {status : 403, message : "Permission denied"};

        return await softDelete(task);
    }
    catch(error){
        console.error('Error', error);
        return {status : 500, message : 'Internal server error'};
    }
}

export const getTaskByProjectId = async(projectId, userId) => {
    const project = await findProjectById(projectId);

    if(!project) return {status : 404, message : 'Project not found'};

    const isMember = isUserMember(projectId, userId);

    if(project.createdBy != userId && !isMember) return {status : 403, message : 'Permission denied'}

    const tasks = findTasks(projectId);

    return { status : 200, data : tasks};
};

export const getAssignedTask = async(projectId, memberId) => {
    const isMember = await activeProjectMember(projectId, memberId);

    if(!isMember) return {status : 403, message : 'Permission denied'};

    const tasks = await taskByProjectAndMember(projectId,memberId);

    return {status : 200, tasks};
}