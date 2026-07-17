const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const sqlitePath = 'file:' + path.join(__dirname, 'dev.db');
const adapter = new PrismaBetterSqlite3({ url: sqlitePath });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@nakshtara.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "AdminPass123!";
  const adminHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "admin" },
    create: {
      email: adminEmail,
      name: "Admin Maison",
      password: adminHash,
      role: "admin",
    }
  });
  console.log("Admin user seeded:", adminEmail);

  await prisma.officialSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      gstRate: 3.0,
      facebook: "",
      instagram: "",
      pinterest: "",
      shippingContent: "",
      returnsContent: "",
      faqContent: "",
      privacyContent: "",
      termsContent: "",
      headerConfig: "{}",
      heroConfig: "{}",
      announcements: "[]",
      features: "[]",
      featuredGems: "[]",
      homepageCollections: "[]",
      evaluatorConfig: "{}",
      milestones: "[]",
      editorialQuote: "{}",
      aboutConfig: "{}",
      contactConfig: "{}",
      customBuilderConfig: "{}",
    }
  });
  console.log("Official settings seeded.");

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
