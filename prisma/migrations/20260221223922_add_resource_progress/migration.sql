-- CreateTable
CREATE TABLE "UserResourceProgress" (
    "userId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserResourceProgress_pkey" PRIMARY KEY ("userId","resourceId")
);

-- AddForeignKey
ALTER TABLE "UserResourceProgress" ADD CONSTRAINT "UserResourceProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserResourceProgress" ADD CONSTRAINT "UserResourceProgress_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
