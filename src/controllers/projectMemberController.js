import * as memberService from '../services/projectMember.services.js';

export const create = async (req, res, next) => {
  try {
    const { projectId, projectMember, role } = req.body;
    const createdBy = req.user.id;
    const member = await memberService.addProjectMember({
      projectId,
      createdBy,
      projectMember,
      role,
    });
    res.status(201).json({ message: 'Member added', member });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const members = await memberService.getMembersByProject(req.params.projectId);
    res.json(members);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { projectId, memberId } = req.params;
    const deleted = await memberService.removeProjectMember(projectId, memberId);
    console.log(deleted)
    if (!deleted) return res.status(404).json({ error: 'Member not found or already deleted' });

    res.json({ message: 'Project member removed' });
  } catch (err) {
    next(err);
  }
};