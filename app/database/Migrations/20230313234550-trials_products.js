module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trials_products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
        unique: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      trial_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'trials',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'products',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('trials_products');
  },
};
