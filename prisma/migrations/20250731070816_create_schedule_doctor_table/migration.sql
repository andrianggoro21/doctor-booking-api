-- CreateTable
CREATE TABLE `schedule_doctor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `scheduleId` INTEGER NOT NULL,
    `bookingTime` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `schedule_doctor` ADD CONSTRAINT `schedule_doctor_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `schedules`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
