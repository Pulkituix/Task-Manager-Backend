import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class UserPermissionProject extends Model {}

    UserPermissionProject.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        permissionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'UserPermissionProject',
        tableName: 'UserPermissionProjects',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['userId', 'permissionId', 'projectId']
            }
        ]
    });

    return UserPermissionProject;
}