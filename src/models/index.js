const { Sequelize } = require("sequelize");
const configs = require('../config');
const sequelize = new Sequelize(configs.DB_NAME, configs.DB_USER, configs.DB_PASSWORD, {
    dialect: configs.DB_DIALECT,
    host: configs.DB_HOST,
    port: configs.DB_PORT,
});
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Sequelize Connected");
    } catch (error) {
        console.log("Sequelize Error", error);
    }
})();

const User = require("./User")(sequelize);
const Image = require("./Image")(sequelize);
const Comment = require("./Comment")(sequelize);
const SaveImage = require("./SaveImage")(sequelize);

Image.belongsToMany(User,{as:'userComment',through:Comment,foreignKey:'imageId'});
User.belongsToMany(Image,{as:"imgComment",through:Comment,foreignKey:'userId'});

Image.belongsTo(User,{as:"user",foreignKey:"userId"});
User.hasMany(Image,{as:"img",foreignKey:"userId"});

Image.belongsToMany(User,{as:'userSave',through:SaveImage,foreignKey:'imageId'});
User.belongsToMany(Image,{as:'imgSave',through:SaveImage,foreignKey:'userId'});



module.exports = {
    sequelize,
    User,
    Image,
}

