import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'permissions',
    [
      {
        name: 'employees_read',
        description: 'Leitura de Funcionário',
        group: 'Funcionários',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'employees_create',
        description: 'Criação de Funcionário',
        group: 'Funcionários',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'employees_update',
        description: 'Atualização de Funcionário',
        group: 'Funcionários',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'employees_delete',
        description: 'Deleção de Funcionário',
        group: 'Funcionários',
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
