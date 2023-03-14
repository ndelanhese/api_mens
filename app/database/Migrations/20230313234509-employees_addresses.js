module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees_addresses', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
        unique: true,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'employees',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'addresses',
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
    await queryInterface.dropTable('employees_addresses');
  },
};
