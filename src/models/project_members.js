import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ProjectMember extends Model {
    static associate(models) {
      ProjectMember.belongsTo(models.Project, {
        foreignKey: 'projectId',
        onDelete: 'CASCADE',
      });
      ProjectMember.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator',
        onDelete: 'CASCADE',
      });
      ProjectMember.belongsTo(models.User, {
        foreignKey: 'projectMember',
        as: 'member',
        onDelete: 'CASCADE',
      });
    }
  }

  ProjectMember.init(
    {
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      projectMember: {  // references to user
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'ProjectMember',
      tableName: 'ProjectMembers3',
      timestamps: true,
      indexes : [
        {
          unique : true,
          fields : ['projectId', 'projectMember']
        }
      ]
    }
  );

  return ProjectMember;
};