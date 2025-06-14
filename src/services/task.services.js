import * as taskRepo from "../repositories/task.repository.js";

export async function createTaskService(data){
    const {title, description, status, projectId, assignedToId, createdBy} = data;

    const project = await taskRepo.findProjectById(projectId);
    if(!project) throw new Error('Project not Found');

    if(assignedToId){
        const isProjectMember = await taskRepo.findProjectMember(projectId, assignedToId);

        if(!isProjectMember) throw new Error('Assignee is not the member of the project');
    }

    const task = await taskRepo.createTask({
        title, description, status, projectId, assignedToId, createdBy
    });
    return task;
};

export async function getTaskById(taskId, userId){
    const task = await taskRepo.getTaskById(taskId);
    if(!task){
        return {status : 404, message : 'Task not found'}
    }

    if(task.createdBy != userId && task.assignedToId != userId){
        return {status : 403, message : 'Permission denied'}
    }

    return task;
}

export async function updateTask(taskId, userId, updates){
    try {
        const task = await taskRepo.getTaskById(taskId);

        if(!task){
            return {status : 404, message : 'Task not found'}
        }

        if(task.createdBy != userId && task.assignedToId != userId){
            return {status : 403, message : 'Permission denied'}
        }

        const {count, updatedTask} = await taskRepo.updateTask(taskId,updates)

        if(count == 0){
            return {status : 500, message : 'Failed to update'}
        }
        return {status : 200, task : updatedTask};
    } catch (error) {
        console.error('Error', error);
        return{status : 500, message : 'Error during task update'};
    }
};

export async function deleteTask(taskId,userId){
    try{
        const task = await taskRepo.getTaskById(taskId);

        if(!task) return {status : 404, message : 'Task not found'};

        if(task.createdBy != userId) return {status : 403, message : "Permission denied"};

        await taskRepo.softDelete(task);

        return{status : 200, message : "Task deleted"};
    }
    catch(error){
        console.error('Error', error);
        return {status : 500, message : 'Internal server error'};
    }
}

export async function getTaskByProjectId(projectId, userId){
    const project = await taskRepo.findProjectById(projectId);

    if(!project) return {status : 404, message : 'Project not found'};

    const isMember = taskRepo.isUserMember(projectId, userId);

    if(project.createdBy != userId && !isMember) return {status : 403, message : 'Permission denied'}

    const tasks = taskRepo.findTasks(projectId);

    return { status : 200, data : tasks};
};

export async function getAssignedTask(projectId, memberId){
    const isMember = await taskRepo.activeProjectMember(projectId, memberId);

    if(!isMember) return {status : 403, message : 'Permission denied'};

    const tasks = await taskRepo.taskByProjectAndMember(projectId,memberId);

    return {status : 200, tasks};
}