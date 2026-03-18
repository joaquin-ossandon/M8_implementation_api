const { sequelize } = require("../config/database");
const { Category } = require("./category.model");
const { Post } = require("./post.model");
const { User } = require("./user.model");

// relación de muchos a muchos
Post.belongsToMany(Category, {
    through: "post_category",
    foreignKey: "postId"
})
Category.belongsToMany(Post, {
    through: "post_category",
    foreignKey: "categoryId"
})

// relación de usuario con posts
User.hasMany(Post, { foreignKey: "userId" })
Post.belongsTo(User, { foreignKey: "userId" })

module.exports = {
    Post,
    Category,
    User,
    sequelize,
}