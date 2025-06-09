import { DataTypes, Model} from 'sequelize';

export default (sequelize, DataTypes) => {
    class Otp extends Model {}

    Otp.init(
        {
            email : {
                type : DataTypes.STRING,
                allowNull : false
            },
            otp : {
                type : DataTypes.STRING,
                allowNull : false
            },
            expiresAt : {
                type : DataTypes.DATE,
                allowNull : false
            }
        },
        {
            sequelize,
            tableName : 'Otps',
            timestamps : true
        }   
    );

    return Otp;
}