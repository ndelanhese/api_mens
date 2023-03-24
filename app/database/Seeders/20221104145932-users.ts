import getDate from '@app/src/Shared/Domain/Utils/Date';
import { hashSync } from 'bcryptjs';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'users',
    [
      {
        user: 'nathan.delanhese',
        email: 'nnathanh3@gmail.com',
        password: hashSync('123delanhese', 10),
        status: 'active',
        employee_id: 1,
        createdAt: getDate(),
        updatedAt: getDate(),
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('users', {});
}
