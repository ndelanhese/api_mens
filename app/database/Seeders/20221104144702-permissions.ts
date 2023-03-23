import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'permissions',
    [
      {
        name: 'users_read',
        description: 'Leitura de usuário',
        group: 'users',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'users_create',
        description: 'Criação de usuário',
        group: 'users',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'users_update',
        description: 'Atualização de usuário',
        group: 'users',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'users_delete',
        description: 'Deleção de usuário',
        group: 'users',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'deleted_users_read',
        description: 'Ver usuários deletados',
        group: 'users',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'restore_users',
        description: 'Restaurar Usuários',
        group: 'users',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'users_purge',
        description: 'Deleção de usuário',
        group: 'users',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'roles_read',
        description: 'Ver perfis',
        group: 'roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'roles_create',
        description: 'Criar perfis',
        group: 'roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'roles_update',
        description: 'Alterar Perfis',
        group: 'roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'roles_delete',
        description: 'Deletar perfis',
        group: 'roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'permission_read',
        description: 'Ler permissões',
        group: 'permissions',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'permission_create',
        description: 'Salvar permissões',
        group: 'permissions',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Banners
      {
        name: 'banners_read',
        description: 'Leitura de banners',
        group: 'banners',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'banners_update',
        description: 'Atualização de banners',
        group: 'banners',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'banners_reorder',
        description: 'Reordenação de banners',
        group: 'banners',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'banners_create',
        description: 'Criação de banners',
        group: 'banners',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'banners_delete',
        description: 'Deleção de banners',
        group: 'banners',
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
