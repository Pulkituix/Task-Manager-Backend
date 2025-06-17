import db from '../models/index.js';

export function checkPermission(permission){
    return async function(req,res,next) {
        try {
            const user = await db.User.findByPk(req.user.id,{
                include : {
                    model : db.Role,
                    include : {model : db.Permission}
                }
            });

            if(!user) return res.status(404).json({message : 'User not found'});

            const userPermissions = [];

            user.Roles.forEach(role => {
                role.Permission.forEach(prms => {
                    userPermissions.push(prms.name);
                });
            });

            if(userPermissions.includes(permission)) return next();
            else return res.status(403).json({message : 'You do not have permission.'});
        } catch (error) {
            return res.status(500).json({message : 'Server Error', error : error.message});
        }
    };
};