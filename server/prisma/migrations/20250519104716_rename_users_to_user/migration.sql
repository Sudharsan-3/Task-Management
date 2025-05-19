/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "fk_creator";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "fk_user";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(20) NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "fk_creator" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
