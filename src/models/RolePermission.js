import {Model} from 'sequelize';

export default(sequelize, DataTypes) => {
    class RolePermission extends Model{}

    RolePermission.init({
        roleId : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        permissionId : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    },
    {
        sequelize,
        modelName : 'RolePermission',
        tableName : 'RolePermissions',
        timestamps : false
    }
    );

    return RolePermission;
}