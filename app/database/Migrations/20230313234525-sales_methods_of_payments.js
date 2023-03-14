module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales_methods_of_payments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
        unique: true,
      },
      installment: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 1,
      },
      sale_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'sales',
          },
          key: 'id',
        },
      },
      method_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'methods_of_payments',
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
    await queryInterface.dropTable('sales_methods_of_payments');
  },
};
