//@ts-nocheck
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}
//global singleton prisma client
export default global.prisma ??= new PrismaClient();
