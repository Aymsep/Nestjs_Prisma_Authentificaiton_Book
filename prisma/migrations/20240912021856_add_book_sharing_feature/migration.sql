-- CreateTable
CREATE TABLE "book_shares" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "bookId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,

    CONSTRAINT "book_shares_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "book_shares" ADD CONSTRAINT "book_shares_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_shares" ADD CONSTRAINT "book_shares_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
