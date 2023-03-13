import { hashSync } from 'bcryptjs';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'users',
    [
      {
        first_name: 'John',
        last_name: 'Doe',
        phone_number: '(99)99999-9999',
        email: 'dev@agenciaecode.com.br',
        password: hashSync('123456', 10),
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        first_name: 'Maycon',
        last_name: 'Dantas',
        phone_number: '(11)99623-7971',
        email: 'maycon.dantas@scansource.com',
        password: hashSync('mudar321senha', 10),
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('users', {});
}
