import getDate from '@app/src/Shared/Domain/Utils/Date';
import { QueryInterface } from 'sequelize';
export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'products',
    [
      {
        part_number: 'ABC1',
        name: 'Camiseta Branca Lisa',
        description: 'Camiseta Masculina Branca Lisa',
        purchase_price: 40.55,
        price: 140.25,
        size: 'GG',
        color: 'Branco',
        quantity: 14,
        category_id: 1,
        brand_id: 1,
        supplier_id: 1,
        createdAt: getDate(),
        updatedAt: getDate(),
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('products', {});
}
