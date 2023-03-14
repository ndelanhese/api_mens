module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('promotions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      discount_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discount_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      initial_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      final_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      promotion_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'promotions_categories',
          },
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('promotions');
  },
};
