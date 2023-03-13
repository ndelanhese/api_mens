module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      manufacturer_slug: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: {
            tableName: 'products_manufacturers',
          },
          key: 'slug',
        },
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      part_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contributor_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      exempt_price: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      outlet: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('products');
  },
};
