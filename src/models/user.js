import { Model } from 'sequelize';
import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Role, {through : 'UserRoles', foreignKey: 'userId' });
      User.belongsToMany(models.Permission, { through: 'UserPermissions', foreignKey: 'userId' });
      User.hasMany(models.Project,{foreignKey : 'createdBy'});
      User.hasMany(models.Task,{foreignKey : 'createdBy'});
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isVerified : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
      },
      roleId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        defaultValue : 6
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users1',
      timestamps : true,
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  );

  return User;
};