import {DataTypes, Model, Sequelize} from 'sequelize';

export default (sequelize, DataTypes) => {
    class Task extends Model{
        static associate(models){
            Task.belongsTo(models.Project,{
                foreignKey : 'projectId'
            });
            Task.belongsTo(models.User,{
                foreignKey : 'createdBy'
            });
            Task.belongsTo(models.User,{
                foreignKey : 'assignedId'
            });
        }
    }

    Task.init(
        {
            title : {
                type : DataTypes.STRING,
                allowNull : false
            },
            description : {
                type : DataTypes.STRING,
                allowNull : true
            },
            status : {
                type : DataTypes.ENUM('todo', 'inProgress', 'completed', 'cancelled'),
                defaultValue : 'todo'
            },
            priority : {
                type : DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
                defaultValue : 'low'
            },
            projectId : {
                type : DataTypes.INTEGER,
                allowNull : false
            },
            assignedToId : {
                type : DataTypes.INTEGER,
                allowNull : true
            },
            createdBy : {
                type : DataTypes.INTEGER,
                allowNull : false
            },
            isDeleted : {
                type : DataTypes.BOOLEAN,
                defaultValue : false
            },
            updatedAt : {
                type : DataTypes.DATE,
                allowNull : false,
                defaultValue : DataTypes.now
            }
        },
        {
            sequelize,
            modelName : 'Task',
            tableName : 'Tasks',
            timestamps : true
        }
    );
    return Task;
};