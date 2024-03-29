module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
        unique: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      observation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      total_value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      discount_amount: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      discount_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      final_value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'pending',
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'customers',
          },
          key: 'id',
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
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
    await queryInterface.dropTable('sales');
  },
};
