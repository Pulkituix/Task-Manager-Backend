import db from "../models/index.js";

export const createTask = async(data) => {
    const {title, description, status, projectId, assignedToId, createdBy} = data;

    const project = await db.Project.findOne({where : {id : projectId, isDeleted : false}});
    if(!project) throw new Error('Project not Found');

    if(assignedToId){
        const isProjectMember = await db.ProjectMember.findOne({where : {projectId, projectMember : assignedToId, isDeleted : false}});

        if(!isProjectMember) throw new Error('Assignee is not the member of the project');
    }

    const task = await db.Task.create({
        title, description, status, projectId, assignedToId, createdBy
    });
    return task;
};

export const getTaskById = async(taskId, userId) => {
    const task = await db.Task.findOne({where : {id : taskId, isDeleted : false}});

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
        const task = await db.Task.findOne({where : {id : taskId, isDeleted : false}});

        if(!task){
            return {status : 404, message : 'Task not found'}
        }

        if(task.createdBy != userId && task.assignedToId != userId){
            return {status : 403, message : 'Permission denied'}
        }

        const [count, [updatedTask]] = await db.Task.update(updates, {where : {id : taskId},returning : true});

        if(!count){
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
        const task = await db.Task.findOne({where : {id : taskId, isDeleted : false}});

        if(!task) return {status : 404, message : 'Task not found'};

        if(task.createdBy != userId) return {status : 403, message : "Permission denied"};

        task.isDeleted = true;
        await task.save();

        return {status : 200, message : 'Task deleted successfully'};
    }
    catch(error){
        console.error('Error', error);
        return {status : 500, message : 'Internal server error'};
    }
}

export const getTaskByProjectId = async(projectId, userId) => {
    const project = await db.Project.findOne({where : {id : projectId, isDeleted : false}});

    if(!project) return {status : 404, message : 'Project not found'};

    const isMember = await db.ProjectMember.findOne({
        where : {
            projectId,
            projectMember : userId,
            isDeleted : false
        }
    });

    if(project.createdBy != userId && !isMember) return {status : 403, message : 'Permission denied'}

    const tasks = await db.Task.findAll({
        where : {
            projectId,
            isDeleted : false
        }
    });

    return { status : 200, data : tasks};
};

export const getAssignedTask = async(projectId, memberId) => {
    const isMember = await db.ProjectMember.findOne({
        where : {
            projectId,
            projectMember : memberId,
            isDeleted : false
        }
    });

    if(!isMember) return {status : 403, message : 'Permission denied'};

    const tasks = await db.Task.findAll({
        where : {
            projectId,
            assignedToId : memberId,
            isDeleted : false
        }
    });

    return {status : 200, tasks};
}