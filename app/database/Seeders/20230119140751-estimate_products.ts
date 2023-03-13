import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'estimates_products',
    [
      {
        estimate_id: 1,
        product_id: 2,
        qtd: 5,
      },
      {
        estimate_id: 1,
        product_id: 1,
        qtd: 6,
      },
      {
        estimate_id: 1,
        product_id: 3,
        qtd: 1,
      },
      {
        estimate_id: 2,
        product_id: 1,
        qtd: 5,
      },
      {
        estimate_id: 2,
        product_id: 4,
        qtd: 6,
      },
      {
        estimate_id: 2,
        product_id: 5,
        qtd: 1,
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('estimates_products', {});
}
