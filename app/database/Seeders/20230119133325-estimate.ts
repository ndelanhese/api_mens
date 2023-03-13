import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'estimates',
    [
      {
        name: 'Jasmine Marie Williams',
        email: 'jmwilliams@gmail.com',
        phone: '(11) 95535-4209',
      },
      {
        name: 'Jasmine Marie Williams',
        email: 'jmwilliams@gmail.com',
        phone: '(11) 95535-4209',
        corporate_name: 'Acme Inc.',
        cnpj: '11.111.111/0001-11',
        address: 'Av. Paulista, 1001',
        state: 'São Paulo',
        postal_code: '01310-200',
        district: 'Bela Vista',
        city: 'São Paulo',
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('estimates', {});
}
