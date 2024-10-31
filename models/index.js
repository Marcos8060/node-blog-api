// models/blog-model.js
const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

// Blog model
const Blog = sequelize.define(
  "Blog",
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please enter a title",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM("WEB_DEV", "ANDROID_DEV", "DATA_SCIENCE"),
      defaultValue: "WEB_DEV",
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pub_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Comment model
const Comment = sequelize.define(
  "Comment",
  {
    text: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please enter comment text",
        },
      },
    },
    pub_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

// Establish model relationships
Blog.hasMany(Comment, { foreignKey: "blogId", as: "comments", onDelete: "CASCADE" });
Comment.belongsTo(Blog, { foreignKey: "blogId", as: "blog" });

// Sync the models
sequelize
  .sync()
  .then(() => {
    console.log("Blog and Comment tables created with relationships");
  })
  .catch((err) => {
    console.error("Unable to create tables:", err);
  });

module.exports = { Blog, Comment };
