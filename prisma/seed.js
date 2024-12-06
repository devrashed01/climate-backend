const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

const userData = [
  {
    name: "Avro",
    email: "avro@gmail.com",
    password: "avro",
  },
  {
    name: "Rashed",
    email: "rashed@gmail.com",
    password: "rashed",
    role: "admin",
  },
];

async function main() {
  console.log(`Start seeding ...`);

  await prisma.user.deleteMany();

  for (const u of userData) {
    const salt = await bcrypt.genSalt(10);
    u.password = await bcrypt.hash(u.password, salt);
    const user = await prisma.user.create({
      data: u,
    });
    // // clear post table
    // await prisma.post.deleteMany();
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
