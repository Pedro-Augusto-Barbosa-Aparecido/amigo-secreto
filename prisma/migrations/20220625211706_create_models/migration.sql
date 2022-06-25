-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "People" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "_PeopleToRoom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PeopleToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "People" ("email") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PeopleToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_name_key" ON "Room"("name");

-- CreateIndex
CREATE UNIQUE INDEX "People_email_key" ON "People"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_PeopleToRoom_AB_unique" ON "_PeopleToRoom"("A", "B");

-- CreateIndex
CREATE INDEX "_PeopleToRoom_B_index" ON "_PeopleToRoom"("B");
