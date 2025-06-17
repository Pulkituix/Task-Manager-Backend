
import * as taskService from '../services/task.services.js';

export async function createTask (req, res) {
    try{
        const createdBy = req.user.id;
        const data = {...req.body, createdBy};

        const task = await taskService.createTaskService(data);
        res.status(201).json({message : 'Task created successfully', task});
    }
    catch(error){
        res.status(500).json({message : 'Internal server error'});
    }
};

export async function getTaskById (req, res) {
    try{
        const taskId = req.params.id;
        const userId = req.user.id;
        
        const task = await taskService.getTaskById(taskId, userId);
        res.json({message : 'Task accessed successfully', task});
    }catch(error){
        res.status(500).json({message : 'Internal server error'});
    }
}

export async function updateTask(req, res) {
    const taskId = req.params.id;
    const userId = req.user.id;
    const changes = req.body;

    try{
        const task = await taskService.updateTask(taskId,userId,changes);

        if(task.status != 200){
            return res.status(updated.status).json({message : task.message})
        }
        res.status(200).json({message : 'Task updated successfully', task});
    }
    catch(error){
        res.status(500).json({message : 'Internal server error'});
    }
};

export async function deleteTask(req,res) {
    try{
        const taskId = req.params.id;
        const userId = req.user.id;

        const task = await taskService.deleteTask(taskId, userId);
        return res.status(task.status).json({message : task.message})
    }
    catch(error){
        return res.status(500).json({message : 'Internal server error'});
    }
}

export async function getTaskByProjectId (req,res) {
    try{
        const projectId = req.params.id;
        const userId = req.user.id;

        const task = await taskService.getTaskByProjectId(projectId, userId);

        if(task.data) return res.status(task.status).json({tasks : task.data});

        return res.status(task.status).json({message : task.message});
    }
    catch(error){
        console.error('Error', error);
        return res.status(500).json({message : 'Internal server error'});
    }
}

export async function getAssignedTask (req,res) {
    try{
        const projectId = req.params.projectId;
        const memberId = req.params.memberId;

        const tasks = await taskService.getAssignedTask(projectId, memberId);

        res.status(tasks.status).json({message : 'Tasks fetched successfully', tasks});
    }
    catch(error){
        console.error('Error', error);
        return res.status(500).json({message : 'Internal server error'});
    }
}