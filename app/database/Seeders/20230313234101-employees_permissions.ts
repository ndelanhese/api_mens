import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'permissions',
    [
      {
        name: 'suppliers_read',
        description: 'Leitura de Fornecedor',
        group: 'Fornecedores',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'suppliers_create',
        description: 'Criação de Fornecedor',
        group: 'Fornecedores',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'suppliers_update',
        description: 'Atualização de Fornecedor',
        group: 'Fornecedores',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'suppliers_delete',
        description: 'Deleção de Fornecedor',
        group: 'Fornecedores',
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
