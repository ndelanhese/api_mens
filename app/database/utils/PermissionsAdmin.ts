/* eslint-disable no-plusplus */
export const permissionsAdmin = () => {
  const permissions = [];
  for (let i = 1; i <= 17; i++) {
    permissions.push({
      permission_id: i,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    permissions.push({
      permission_id: i,
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return permissions;
};
