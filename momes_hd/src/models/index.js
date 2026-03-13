const { sequelize } = require("../config/database");
const { Category } = require("./category.model");
const { Post } = require("./post.model");

Post.belongsToMany(Category, {
    through: "post_category",
    foreignKey: "postId"
})
Category.belongsToMany(Post, {
    through: "post_category",
    foreignKey: "categoryId"
})

module.exports = {
    Post,
    Category,
    sequelize,
}