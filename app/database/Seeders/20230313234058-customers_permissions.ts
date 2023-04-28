import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'permissions',
    [
      {
        name: 'customers_read',
        description: 'Leitura de Cliente',
        group: 'Clientes',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'customers_create',
        description: 'Criação de Cliente',
        group: 'Clientes',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'customers_update',
        description: 'Atualização de Cliente',
        group: 'Clientes',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'customers_delete',
        description: 'Deleção de Cliente',
        group: 'Clientes',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('permissions', {});
}
