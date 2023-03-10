const {DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize) =>{
    return sequelize.define(
        "Comment",{
            userId:{
                type:DataTypes.INTEGER,
                field:'nguoi_dung_id'
            },
            imageId:{
                type:DataTypes.INTEGER,
                field:'hinh_id'
            },
            comment:{
                type:DataTypes.STRING,
                field:'binh_luan'
            },
            commentDate:{
                type:DataTypes.DATE,
                field:'ngay_binh_luan',
                defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
            }
        },{
            tableName:"binh_luan",
            timestamps:false,
        }
    )
}