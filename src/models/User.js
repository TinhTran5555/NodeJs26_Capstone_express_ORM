const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    return sequelize.define(
        "User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'nguoi_dung_id'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'email',
            validate: {
                isEmail: {
                    msg: 'Invalid email'
                },
                notNull: {
                    msg: 'Require email'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'mat_khau',
            validate: {
                notNull: {
                    msg: 'Require password'
                }
            },
            set(value) {
                const saltSync = bcrypt.genSaltSync();
                const hashedPassword = bcrypt.hashSync(value, saltSync);
                this.setDataValue("password", hashedPassword);
            }
        },
        name: {
            type: DataTypes.STRING,
            field: 'ho_ten',
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Require name'
                }
            },
        },
        age: {
            type: DataTypes.INTEGER,
            field: 'tuoi',
            validate: {
                isNumeric: {
                    msg: 'Age is number'
                },
                min: 0,
                max: 120,
            }
        },
        avatar: {
            type: DataTypes.STRING,
            field: 'anh_dai_dien'
        },
        role: {
            type: DataTypes.ENUM('admin','user'),
            defaultValue: 'user'
        }
    },
        {
            tableName: "nguoi_dung",
            timestamps: false,
            defaultScope: {
                attributes: {
                    exclude: ["password"],
                },
            },
            hooks: {
                afterSave: (record) => {
                    delete record.dataValues.password;
                },
            },
        }
    )
}