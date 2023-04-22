import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'permissions',
    [
      {
        name: 'brands_read',
        description: 'Leitura de Marca',
        group: 'Marcas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'brands_create',
        description: 'Criação de Marca',
        group: 'Marcas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'brands_update',
        description: 'Atualização de Marca',
        group: 'Marcas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'brands_delete',
        description: 'Deleção de Marca',
        group: 'Marcas',
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
