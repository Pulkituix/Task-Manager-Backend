import {Model} from 'sequelize';

export default(sequelize, DataTypes) => {
    class UserRole extends Model{}

    UserRole.init({
        userId : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        roleId : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    },
    {
        sequelize,
        modelName : 'UserRole',
        tableName : 'UserRoles',
        timestamps : false
    }
    );

    return UserRole;
}