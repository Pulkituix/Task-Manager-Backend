import db from '../models/index.js';

export async function isProjectCreator(req, res, next) {
  try {
    const projectId = req.params.id;

    if (!projectId) {
      return res.status(400).json({ error: 'Project ID is missing' });
    }

    const project = await db.Project.findByPk(projectId);

    if (!project || project.createdBy !== req.user.id) {
      return res.status(403).json({ error: 'Only project creator allowed' });
    }

    next();
  } catch (err) {
    next(err);
  }
};

export async function isProjectCreator2(req, res, next) {
  const projectId = req.body.projectId || req.params.id;

  if (!projectId) {
    return res.status(400).json({ error: 'Project ID is missing' });
  }

  const project = await db.Project.findByPk(projectId);
  if (!project || project.createdBy !== req.user.id) {
    return res.status(403).json({ error: 'Only project creator is allowed' });
  }

  next();
};

export async function canUpdateProject(req, res, next) {
  const projectId = req.params.id;
  const userId = req.user.id;
  const project = await db.Project.findByPk(projectId);

  if (!project || project.isDeleted) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const isMember = await db.ProjectMember.findOne({
    where: { projectId, projectMember: userId, isDeleted: false },
  });

  if (project.createdBy !== userId && !isMember) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  next();
};