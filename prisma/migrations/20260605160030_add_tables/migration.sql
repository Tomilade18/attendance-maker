-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'COURSE_REP', 'TEACHER');

-- CreateEnum
CREATE TYPE "attendanceStatus" AS ENUM ('PRESENT', 'ABSENT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "matricNo" TEXT,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "department" TEXT NOT NULL,
    "level" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "course_no" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendancelist" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "status" "attendanceStatus" NOT NULL DEFAULT 'ABSENT',
    "createBy" TEXT NOT NULL,
    "attendance_date" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendancelist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_matricNo_key" ON "User"("matricNo");

-- CreateIndex
CREATE UNIQUE INDEX "Class_course_no_key" ON "Class"("course_no");

-- CreateIndex
CREATE UNIQUE INDEX "Attendancelist_studentId_classId_attendance_date_key" ON "Attendancelist"("studentId", "classId", "attendance_date");

-- AddForeignKey
ALTER TABLE "Attendancelist" ADD CONSTRAINT "Attendancelist_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendancelist" ADD CONSTRAINT "Attendancelist_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendancelist" ADD CONSTRAINT "Attendancelist_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
