import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.User, {
        foreignKey: 'createdBy',
        onDelete: 'CASCADE',
      });
      Project.hasMany(models.ProjectMember, {
        foreignKey: 'projectId',
        as : 'projectMembers',
        onDelete: 'CASCADE',
      });
    }
  }

  Project.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM('active', 'completed'),
        defaultValue: 'active',
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isDeleted: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    }
    },
    {
      sequelize,
      modelName: 'Project',
      tableName: 'Projects3',
      timestamps: true,
    }
  );

  return Project;
};