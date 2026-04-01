import * as path from 'path';
import AppDataSource from './data-source';

async function main() {
  const entity = process.argv[2];
  const count = parseInt(process.argv[3], 10) || undefined;

  if (!entity) {
    console.error('❌ Please provide an entity name: npm run seed -- <entity> [count]');
    process.exit(1);
  }

  try {
    console.log(`🚀 Initializing database connection...`);
    await AppDataSource.initialize();
    console.log(`✅ Database connected.`);

    // Capitalize entity name for the function name
    const functionName = `seed${entity.charAt(0).toUpperCase() + entity.slice(1)}`;
    console.log(`🌱 Importing seeder for: ${entity}...`);
    
    // Use path for absolute import
    const seederPath = path.join(__dirname, 'seeds', `${entity}.seed`);
    console.log(`🔍 Loading seeder from: ${seederPath}`);
    
    // In CJS, require() works perfectly for dynamic loading of .ts files with ts-node
    const seederModule = require(seederPath);
    const seeder = seederModule[functionName];

    if (typeof seeder !== 'function') {
      console.error(`❌ Function ${functionName} not found in ./seeds/${entity}.seed`);
      process.exit(1);
    }

    console.log(`🏃 Running seeder: ${functionName}${count ? ' with count ' + count : ''}...`);
    await seeder(AppDataSource, count);

    console.log(`✨ Seeding completed.`);
  } catch (error) {
    console.error(`❌ Seeding failed:`, error);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log(`🔌 Database connection closed.`);
    }
  }
}

main().catch((err) => {
  console.error('💥 Fatal error:', err);
  process.exit(1);
});
