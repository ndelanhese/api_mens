import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'addresses',
    [
      {
        address: 'Rua Lídio Eleutério Souza',
        number: '780',
        district: 'Jardim Imperial',
        postal_code: '87580000',
        city: 'Alto Piquiri',
        state: 'Paraná',
        created_at: getDate(),
        updated_at: getDate(),
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('addresses', {});
}
