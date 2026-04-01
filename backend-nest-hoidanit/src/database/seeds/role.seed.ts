import { DataSource } from 'typeorm';
import { Role } from '../../features/role/entities/role.entity';

export async function seedRole(dataSource: DataSource, count?: number) {
  const roleRepo = dataSource.getRepository(Role);

  const defaultRoles = [
    { name: 'ADMIN', description: 'Administrator with full access' },
    { name: 'USER', description: 'Regular user with basic access' },
    { name: 'MANAGER', description: 'Manager with elevated access' },
  ];

  // If count is specified, we can adjust the list or just use what we have
  const rolesToSeed = count ? defaultRoles.slice(0, count) : defaultRoles;

  for (const roleData of rolesToSeed) {
    const existingRole = await roleRepo.findOne({ where: { name: roleData.name } });
    if (existingRole) {
      console.log(`⏭ Role "${roleData.name}" already exists, skipping.`);
      continue;
    }

    const role = roleRepo.create(roleData);
    await roleRepo.save(role);
    console.log(`✓ Seeded role: ${roleData.name}`);
  }
}
