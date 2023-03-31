import getDate from '@app/src/Shared/Domain/Utils/Date';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'permissions',
    [
      {
        name: 'users_read',
        description: 'Leitura de usuário',
        group: 'Usuários',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'users_create',
        description: 'Criação de usuário',
        group: 'Usuários',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'users_update',
        description: 'Atualização de usuário',
        group: 'Usuários',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'users_delete',
        description: 'Deleção de usuário',
        group: 'Usuários',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'deleted_users_read',
        description: 'Ver usuários deletados',
        group: 'Usuários',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'restore_users',
        description: 'Restaurar Usuários',
        group: 'Usuários',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'users_purge',
        description: 'Deleção de usuário',
        group: 'Usuários',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'acl_read',
        description: 'Ver perfis',
        group: 'Papéis e Permissões',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'acl_create',
        description: 'Criar perfis',
        group: 'Papéis e Permissões',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'acl_update',
        description: 'Alterar Perfis',
        group: 'Papéis e Permissões',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'acl_delete',
        description: 'Excluir perfis',
        group: 'Papéis e Permissões',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Banners
      {
        name: 'banners_read',
        description: 'Leitura de banners',
        group: 'Banners',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'banners_update',
        description: 'Atualização de banners',
        group: 'Banners',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'banners_reorder',
        description: 'Reordenação de banners',
        group: 'Banners',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'banners_create',
        description: 'Criação de banners',
        group: 'Banners',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'banners_delete',
        description: 'Deleção de banners',
        group: 'Banners',
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
