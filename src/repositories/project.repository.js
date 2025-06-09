import db from "../models/index.js";
import { Op } from "sequelize";

export const createProjectRepo = async (data) => {
  return await db.Project.create(data);
};

export const getProjectsByUserRepo = async (userId) => {
  return await db.Project.findAll({ where: { createdBy: userId , isDeleted : false} });
};

export const getProjectByIdRepo = async (id, userId) => {
  return await db.Project.findOne({ where: { id, createdBy: userId , isDeleted : false} });
};

export const updateProjectRepo = async (id, data, userId) => {
  return await db.Project.update(data, { where: { id, createdBy: userId , isDeleted : false} });
};

export const findProjectByIdAndUser = async (projectId, userId) => {
  return await db.Project.findOne({
    where: {
      id: projectId,
      createdBy: userId,
      isDeleted: false,
    },
  });
};

export const softDelete = async(project) => {
    project.isDeleted = true;
    return await project.save();
};

export const getUserProjectsRepo = async(userId) => {
    return await db.Project.findAll({
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
}

export const getProjectByTitle = async(userId, title) => {
    return await db.Project.findAll({
        where : {
          isDeleted : false,
          title : {[Op.iLike] : `%${title}%`},
          [Op.or] : [
            {createdBy : userId},
            {
              id: {
                [Op.in] : db.sequelize.literal(`(
                  SELECT "projectId" FROM "ProjectMembers3"
                  WHERE "projectMember" = ${userId} AND "isDeleted" = false
                )`)
              }
            }
          ]
        }
      });
}