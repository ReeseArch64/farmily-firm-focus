import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: adminPassword,
      name: "Administrador",
      role: "ADMIN",
    },
  });
  console.log("Admin criado:", admin.username);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
