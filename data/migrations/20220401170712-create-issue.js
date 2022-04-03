"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("issues", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      created_by: {
        type: Sequelize.STRING,
        defaultValue: "unknown",
      },
      updated_by: {
        type: Sequelize.STRING,
        defaultValue: "unknown",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("issues");
  },
};
