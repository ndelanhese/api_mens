import getDate from '@app/src/Shared/Domain/Utils/Date';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'permissions',
    [
      {
        name: 'users_read',
        description: 'Ver usuário',
        group: 'Usuários',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'users_create',
        description: 'Criar usuário',
        group: 'Usuários',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'users_update',
        description: 'Atualizar usuário',
        group: 'Usuários',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'users_delete',
        description: 'Deletar usuário',
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
        description: 'Deletar usuário',
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
        description: 'Ver banners',
        group: 'Banners',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'banners_update',
        description: 'Atualizar banners',
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
        description: 'Criar banners',
        group: 'Banners',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'banners_delete',
        description: 'Deletar banners',
        group: 'Banners',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'brands_read',
        description: 'Ver Marca',
        group: 'Marcas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'brands_create',
        description: 'Criar Marca',
        group: 'Marcas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'brands_update',
        description: 'Atualizar Marca',
        group: 'Marcas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'brands_delete',
        description: 'Deletar Marca',
        group: 'Marcas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'categories_read',
        description: 'Ver Categoria',
        group: 'Categorias',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'categories_create',
        description: 'Criar Categoria',
        group: 'Categorias',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'categories_update',
        description: 'Atualizar Categoria',
        group: 'Categorias',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'categories_delete',
        description: 'Deletar Categoria',
        group: 'Categorias',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'customers_read',
        description: 'Ver Cliente',
        group: 'Clientes',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'customers_create',
        description: 'Criar Cliente',
        group: 'Clientes',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'customers_update',
        description: 'Atualizar Cliente',
        group: 'Clientes',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'customers_delete',
        description: 'Deletar Cliente',
        group: 'Clientes',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'employees_read',
        description: 'Ver Funcionário',
        group: 'Funcionários',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'employees_create',
        description: 'Criar Funcionário',
        group: 'Funcionários',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'employees_update',
        description: 'Atualizar Funcionário',
        group: 'Funcionários',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'employees_delete',
        description: 'Deletar Funcionário',
        group: 'Funcionários',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'suppliers_read',
        description: 'Ver Fornecedor',
        group: 'Fornecedores',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'suppliers_create',
        description: 'Criar Fornecedor',
        group: 'Fornecedores',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'suppliers_update',
        description: 'Atualizar Fornecedor',
        group: 'Fornecedores',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'suppliers_delete',
        description: 'Deletar Fornecedor',
        group: 'Fornecedores',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'products_read',
        description: 'Ver Produto',
        group: 'Produtos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'products_create',
        description: 'Criar Produto',
        group: 'Produtos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'products_update',
        description: 'Atualizar Produto',
        group: 'Produtos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'products_delete',
        description: 'Deletar Produto',
        group: 'Produtos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'products_export',
        description: 'Exportar de Produto',
        group: 'Produtos',
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
