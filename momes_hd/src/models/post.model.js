const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Post = sequelize.define("Post", {
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = { Post }