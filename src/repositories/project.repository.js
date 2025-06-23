import db from "../models/index.js";
import { Op } from "sequelize";

export async function createProject(data){
  return await db.Project.create(data);
};

export async function getProjectById(id) {
  return await db.Project.findOne({ where: { id, isDeleted : false} });
};

export async function getAllProjects() {
  return await db.Project.findAll({where : {isDeleted : false}});
}

export async function updateProject(id, data){
  return await db.Project.update(data, { where: { id, isDeleted : false} });
};

export async function softDelete(project){
    project.isDeleted = true;
    return await project.save();
};

export async function getUserProjects(userId){
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

export async function getProjectByTitle(userId, title){
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