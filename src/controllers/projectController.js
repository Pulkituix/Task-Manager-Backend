import db from '../models/index.js'
import * as projectService from '../services/project.services.js';
const ProjectModel = db.User;

export async function create(req, res, next){
  try {
    const { title, description, status } = req.body;
    const userId = req.user?.id;

    const project = await projectService.createProject({
      title,
      description,
      status,
      createdBy: userId,
    });

    res.status(201).json({ message: 'Project created', project });
  } catch (err) {
    next(err);
  }
};

export async function getAll(req, res, next){
  try {
    const projects = await projectService.getProjectsByUser(req.user.id);
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

export async function getOne(req, res, next){
  try {
    const project = await projectService.getProjectById(req.params.id, req.user.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    res.json(project);
  } catch (err) {
    next(err);
  }
};

export async function update(req, res, next){
  try {
    const updated = await projectService.updateProject(req.params.id, req.body, req.user.id);
    if (updated[0] === 0) return res.status(404).json({ error: 'Project not found or unauthorized' });

    res.json({ message: 'Project updated' });
  } catch (err) {
    next(err);
  }
};

export async function remove(req, res, next){
  try {
    const projectId = req.params.id;
    const userId = req.user.id;

    const deletedProject = await projectService.deleteProject(projectId, userId);

    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found or already deleted' });
    }

    return res.status(deletedProject.status).json({ message: deletedProject.message });
  } catch (err) {
    next(err);
  }
};


export async function getMyProjects(req, res) {
  try {
    const userId = req.user.id;
    const projects = await projectService.getUserProjects(userId);

    return res.status(200).json({
      message: 'Projects fetched successfully',
      data: projects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export async function searchProjects (req, res) {
  try {
    const userId = req.user?.id;
    const {title, projectId} = req.query;
    // const {title} = req.query;
    const projects = await projectService.searchProjects(userId, title, projectId);
    // const projects = await projectService.searchProjects(userId, title);
    res.status(200).json({message : 'Projects fetched successfully', projects})
  } catch (error) {
    console.error('Error', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}