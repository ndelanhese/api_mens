import getDate from '@app/src/Shared/Domain/Utils/Date';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'permissions',
    [
      {
        name: 'users_read',
        description: 'Leitura de usuário',
        group: 'users',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'users_create',
        description: 'Criação de usuário',
        group: 'users',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'users_update',
        description: 'Atualização de usuário',
        group: 'users',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'users_delete',
        description: 'Deleção de usuário',
        group: 'users',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'deleted_users_read',
        description: 'Ver usuários deletados',
        group: 'users',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'restore_users',
        description: 'Restaurar Usuários',
        group: 'users',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'users_purge',
        description: 'Deleção de usuário',
        group: 'users',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'roles_read',
        description: 'Ver perfis',
        group: 'roles',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'roles_create',
        description: 'Criar perfis',
        group: 'roles',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'roles_update',
        description: 'Alterar Perfis',
        group: 'roles',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'roles_delete',
        description: 'Deletar perfis',
        group: 'roles',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'permission_read',
        description: 'Ler permissões',
        group: 'permissions',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'permission_create',
        description: 'Salvar permissões',
        group: 'permissions',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      //Banners
      {
        name: 'banners_read',
        description: 'Leitura de banners',
        group: 'banners',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'banners_update',
        description: 'Atualização de banners',
        group: 'banners',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'banners_reorder',
        description: 'Reordenação de banners',
        group: 'banners',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'banners_create',
        description: 'Criação de banners',
        group: 'banners',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'banners_delete',
        description: 'Deleção de banners',
        group: 'banners',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('permissions', {});
}
