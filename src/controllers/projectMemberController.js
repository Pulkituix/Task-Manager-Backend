import * as memberService from '../services/projectMember.services.js';

export async function create (req, res, next) {
  try {
    const { projectId, projectMember, role } = req.body;
    const createdBy = req.user.id;

    if (!projectId || !projectMember || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const member = await memberService.addProjectMember({
      projectId,
      createdBy,
      projectMember,
      role,
    });

    res.status(201).json({ message: 'Member added', member });
  } catch (err) {
    console.error('Controller Error:', err); // Log the error
    next(err);
  }
};


export async function getAll(req, res, next) {
  try {
    const members = await memberService.getMembersByProject(req.params.projectId);
    res.json(members);
  } catch (err) {
    next(err);
  }
};

export async function remove (req, res, next){
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