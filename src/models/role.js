import {Model} from 'sequelize';

export default (sequelize, DataTypes) => {
    class Role extends Model{
        static associate(models) {
            Role.belongsToMany(models.User, {through : 'UserRole', foreignKey: 'roleId' });
            Role.belongsToMany(models.Permission, {through : 'RolePermission', foreignKey : 'roleId'});
        }
    }

    Role.init(
        {
            name : {
                type : DataTypes.STRING,
                allowNull : false,
                unique : true
            }
        },
        {
            sequelize,
            modelName : 'Role',
            tableName : 'Roles',
            timestamps : false
        }
    );

    return Role;
};