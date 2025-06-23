import db from '../models/index.js';;

function method_action(method){
    switch(method){
        case 'POST' : return 'create';
        case 'GET' : return 'read';
        case 'PUT' : return 'update';
        case 'DELETE' : return 'delete';
        default : return '';
    }
};

export async function checkPermission(req, res, next){
    try {
        const action = method_action(req.method);

        const splitPath = req.baseUrl.split('/').filter(Boolean).pop();
        const requiredPermission = `${action}-${splitPath}`;

        const userId = req.user?.id;
        if(!userId) return res.status(401).json({message : "User ID missing"});

        if(action === 'create'){
            return next();
        }

        const projectId = req.params.id ||  req.body.projectId || req.query.projectId;
        if (!projectId) return res.status(400).json({ message: "Project ID missing" });

        const project = await db.Project.findOne({where : {id : projectId, isDeleted : false}});
        if(!project) return res.status(404).json({message : "Project not found"});
        if(project.createdBy === userId) return next();
        
        const permission = await db.Permission.findOne({where : {name : requiredPermission}});
        if(!permission) return res.status(403).json({ message: "Permission does not exist" });

        const userPermission = await db.UserPermissionProject.findOne({
            where : {
                userId : userId,
                permissionId : permission.id,
                projectId : projectId
            }
        })

        if(!userPermission) return res.status(403).json({message : "Missing Permission"});

        next();

    } catch (error) {
        return res.status(500).json({message : 'Server Error', error : error.message});
    }
};