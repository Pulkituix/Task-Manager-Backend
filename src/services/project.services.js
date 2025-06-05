import db from '../models/index.js';
import { Op } from 'sequelize';

export const createProject = async (data) => {
  return await db.Project.create(data);
};

export const getProjectsByUser = async (userId) => {
  return await db.Project.findAll({ where: { createdBy: userId , isDeleted : false} });
};

export const getProjectById = async (id, userId) => {
  return await db.Project.findOne({ where: { id, createdBy: userId , isDeleted : false} });
};

export const updateProject = async (id, data, userId) => {
  return await db.Project.update(data, { where: { id, createdBy: userId , isDeleted : false} });
};

export const deleteProject = async (projectId, userId) => {
  const project = await db.Project.findOne({
    where: {
      id: projectId,
      createdBy: userId,
      isDeleted: false,
    },
  });

  if (!project) return null;

  project.isDeleted = true;
  await project.save();
  return project;
};

export const getUserProjects = async (userId) => {
  const projects = await db.Project.findAll({
    where: {
      isDeleted: false,
      [Op.or]: [
        { createdBy: userId },
        {'$projectMembers.projectMember$': userId}
      ]
    },
    include: [
      {
        model: db.ProjectMember,
        as: 'projectMembers',
        where: {isDeleted: false},
        required: false
      }
    ]
  });

  return projects;
};