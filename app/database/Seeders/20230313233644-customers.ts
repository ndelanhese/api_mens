import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'customers',
    [
      {
        name: 'Nathan Henrique P. Delanhese',
        cpf: '12228019909',
        rg: '147395183',
        birth_date: getDate('2002-06-19'),
        phone: '44997294087',
        created_at: getDate(),
        updated_at: getDate(),
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('customers', {});
}
