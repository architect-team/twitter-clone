-- CreateTable
CREATE TABLE "Yeet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "ownerId" TEXT NOT NULL,
    "message" VARCHAR(280) NOT NULL,

    CONSTRAINT "Yeet_pkey" PRIMARY KEY ("id")
);
