"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("revisions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      change_key: {
        type: Sequelize.STRING,
      },
      old_value: {
        type: Sequelize.STRING,
      },
      new_value: {
        type: Sequelize.TEXT,
      },
      created_by: {
        type: Sequelize.STRING,
        defaultValue: "unknown",
      },
      issue_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "issues",
          key: "id",
          as: "issue_id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("revisions");
  },
};
