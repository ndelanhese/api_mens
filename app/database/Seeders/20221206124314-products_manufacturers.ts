import { getSlugManufacturerName } from '../../src/Shared/Domain/Utils/String';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  const manufactureresNames = [
    'Argox',
    'Datalogic',
    'Dimep',
    'Elgin bematech',
    'Elo',
    'Epson',
    'Gerbo',
    'Gertec',
    'Gts',
    'Honeywell',
    'Logic controls',
    'Menno',
    'Monus',
    'Postech',
    'Tanca',
    'Zebra',
  ];
  await queryInterface.bulkInsert(
    'products_manufacturers',
    [
      {
        slug: getSlugManufacturerName(manufactureresNames[0]),
        name: manufactureresNames[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: getSlugManufacturerName(manufactureresNames[1]),
        name: manufactureresNames[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: getSlugManufacturerName(manufactureresNames[2]),
        name: manufactureresNames[2],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: getSlugManufacturerName(manufactureresNames[3]),
        name: manufactureresNames[3],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: getSlugManufacturerName(manufactureresNames[4]),
        name: manufactureresNames[4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: getSlugManufacturerName(manufactureresNames[5]),
        name: manufactureresNames[5],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: getSlugManufacturerName(manufactureresNames[6]),
        name: manufactureresNames[6],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: getSlugManufacturerName(manufactureresNames[7]),
        name: manufactureresNames[7],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: getSlugManufacturerName(manufactureresNames[8]),
        name: manufactureresNames[8],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: getSlugManufacturerName(manufactureresNames[9]),
        name: manufactureresNames[9],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: getSlugManufacturerName(manufactureresNames[10]),
        name: manufactureresNames[10],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: getSlugManufacturerName(manufactureresNames[11]),
        name: manufactureresNames[11],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: getSlugManufacturerName(manufactureresNames[12]),
        name: manufactureresNames[12],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: getSlugManufacturerName(manufactureresNames[13]),
        name: manufactureresNames[13],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: getSlugManufacturerName(manufactureresNames[14]),
        name: manufactureresNames[14],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('products_manufacturers', {});
}
