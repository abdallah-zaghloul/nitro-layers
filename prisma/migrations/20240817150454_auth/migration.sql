-- CreateEnum
CREATE TYPE "PersonaType" AS ENUM('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Auth" (
    "accessId" UUID NOT NULL,
    "accessToken" TEXT NOT NULL,
    "personaType" "PersonaType" NOT NULL,
    "personaId" UUID NOT NULL,
    "expiresIn" BIGINT NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "refreshedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,


CONSTRAINT "Auth_pkey" PRIMARY KEY ("accessId") );

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,


CONSTRAINT "User_pkey" PRIMARY KEY ("id") );

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");