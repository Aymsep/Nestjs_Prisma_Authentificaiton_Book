-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "bookname" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "publisherId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
