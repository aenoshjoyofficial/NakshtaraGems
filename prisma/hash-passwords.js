const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

async function main() {
  const dbPath = 'file:' + path.join(__dirname, '../dev.db');
  const adapter = new PrismaBetterSqlite3({ url: dbPath });
  const prisma = new PrismaClient({ adapter });

  console.log("Fetching users...");
  const users = await prisma.user.findMany();
  console.log(`Found ${users.length} users.`);

  for (const user of users) {
    const isHashed = user.password.startsWith('$2a$') || user.password.startsWith('$2b$');
    if (!isHashed && user.password) {
      console.log(`Hashing password for ${user.email}...`);
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      });
    } else {
      console.log(`Password for ${user.email} is already hashed or empty.`);
    }
  }

  console.log("All passwords processed successfully!");
  await prisma.$disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
