import { PrismaClient } from "@prisma/client";
import { sales } from "./sales.js";
import { orders } from "./orders.js";
import { customers } from "./customers.js";
import { revenues } from "./revenues.js";
import { sessions } from "./sessions.js";
import { views } from "./views.js";
import { channelSales } from "./channelSales.js";
import { fulfilledOrders } from "./fulfilledOrders.js";
import { returningCustomerRates } from "./returningCustomerRates.js";

const prisma = global.prisma || new PrismaClient();

async function main() {
  await sales(prisma);
  await orders(prisma);
  await customers(prisma);
  await revenues(prisma);
  await sessions(prisma);
  await views(prisma);
  await channelSales(prisma);
  await fulfilledOrders(prisma);
  await returningCustomerRates(prisma);
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
