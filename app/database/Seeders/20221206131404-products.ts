import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'products',
    [
      {
        manufacturer_slug: 'ARGOX',
        type: 'Type Product',
        part_number: '123A',
        description: 'A test product',
        currency: '$',
        contributor_price: 140.4,
        exempt_price: 160.0,
        note: 'This product is a test product',
        outlet: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        manufacturer_slug: 'ELGIN_BEMATECH',
        type: 'Type Product two',
        part_number: '321Z',
        description: 'A second test product',
        currency: '$',
        contributor_price: 135.99,
        exempt_price: 135.99,
        outlet: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        manufacturer_slug: 'ELO',
        type: 'Type Product',
        part_number: '123B',
        description: 'A test product',
        currency: '$',
        contributor_price: 140.4,
        exempt_price: 160.0,
        note: 'This product is a test product',
        outlet: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        manufacturer_slug: 'LOGIC_CONTROLS',
        type: 'Type Product',
        part_number: '123C',
        description: 'A test product',
        currency: '$',
        contributor_price: 140.4,
        exempt_price: 160.0,
        note: 'This product is a test product',
        outlet: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        manufacturer_slug: 'TANCA',
        type: 'Type Product',
        part_number: '123D',
        description: 'A test product',
        currency: '$',
        contributor_price: 140.4,
        exempt_price: 160.0,
        note: 'This product is a test product',
        outlet: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        manufacturer_slug: 'ELO',
        type: 'Type Product',
        part_number: '123E',
        description: 'A test product',
        currency: '$',
        contributor_price: 140.4,
        exempt_price: 160.0,
        note: 'This product is a test product',
        outlet: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('products', {});
}
