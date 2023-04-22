import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'permissions',
    [
      {
        name: 'categories_read',
        description: 'Leitura de Categoria',
        group: 'Categorias',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'categories_create',
        description: 'Criação de Categoria',
        group: 'Categorias',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'categories_update',
        description: 'Atualização de Categoria',
        group: 'Categorias',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'categories_delete',
        description: 'Deleção de Categoria',
        group: 'Categorias',
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
