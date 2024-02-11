-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_username_key`(`username`),
    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `data` JSON NOT NULL,
    `isRead` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorites` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animes_ids` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FavoritesOnUsers` (
    `userId` INTEGER NOT NULL,
    `favoriteId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userId`, `favoriteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Watchlist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animes_ids` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WatchlistOnUsers` (
    `userId` INTEGER NOT NULL,
    `watchlistId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userId`, `watchlistId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Top5` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animes_ids` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Top5OnUsers` (
    `userId` INTEGER NOT NULL,
    `top5Id` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userId`, `top5Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recommandations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animes_ids` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecommandationsOnUsers` (
    `userId` INTEGER NOT NULL,
    `recommandationId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `recommandationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Calendars` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,
    `streamingPlatformId` INTEGER NOT NULL,

    UNIQUE INDEX `Calendars_userId_key`(`userId`),
    UNIQUE INDEX `Calendars_streamingPlatformId_key`(`streamingPlatformId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StreamingPlatforms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `api_url` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Claims` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `claim_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,
    `rewardId` INTEGER NOT NULL,

    UNIQUE INDEX `Claims_userId_key`(`userId`),
    UNIQUE INDEX `Claims_rewardId_key`(`rewardId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rewards` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `badge` VARCHAR(191) NOT NULL,
    `condition` INTEGER NOT NULL,
    `typeId` INTEGER NOT NULL,

    UNIQUE INDEX `Rewards_typeId_key`(`typeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Watch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `watched_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `episode_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Authors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firtName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuthorsOnAnimes` (
    `animeId` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `AuthorsOnAnimes_animeId_key`(`animeId`),
    PRIMARY KEY (`animeId`, `authorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Animes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `japanese_title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `jacket_img` VARCHAR(191) NOT NULL,
    `banner_img` VARCHAR(191) NOT NULL,
    `puplished_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `crunchyroll_ref` VARCHAR(191) NOT NULL,
    `adn_ref` VARCHAR(191) NOT NULL,
    `my_anime_list_ref` VARCHAR(191) NOT NULL,
    `statusId` INTEGER NOT NULL,

    UNIQUE INDEX `Animes_statusId_key`(`statusId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seasons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `puplished_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `animeId` INTEGER NOT NULL,

    UNIQUE INDEX `Seasons_animeId_key`(`animeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Episodes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `puplish_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `seasonId` INTEGER NOT NULL,

    UNIQUE INDEX `Episodes_seasonId_key`(`seasonId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Themes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ThemesOnAnimes` (
    `animeId` INTEGER NOT NULL,
    `themeId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`animeId`, `themeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnimeTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnimeTypesOnAnimes` (
    `animeId` INTEGER NOT NULL,
    `animeTypeId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`animeId`, `animeTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gender` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GenderOnAnimes` (
    `animeId` INTEGER NOT NULL,
    `genderId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`animeId`, `genderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Studios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudiosOnAnimes` (
    `animeId` INTEGER NOT NULL,
    `studioId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`animeId`, `studioId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoritesOnUsers` ADD CONSTRAINT `FavoritesOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoritesOnUsers` ADD CONSTRAINT `FavoritesOnUsers_favoriteId_fkey` FOREIGN KEY (`favoriteId`) REFERENCES `Favorites`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WatchlistOnUsers` ADD CONSTRAINT `WatchlistOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WatchlistOnUsers` ADD CONSTRAINT `WatchlistOnUsers_watchlistId_fkey` FOREIGN KEY (`watchlistId`) REFERENCES `Watchlist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Top5OnUsers` ADD CONSTRAINT `Top5OnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Top5OnUsers` ADD CONSTRAINT `Top5OnUsers_top5Id_fkey` FOREIGN KEY (`top5Id`) REFERENCES `Top5`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecommandationsOnUsers` ADD CONSTRAINT `RecommandationsOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecommandationsOnUsers` ADD CONSTRAINT `RecommandationsOnUsers_recommandationId_fkey` FOREIGN KEY (`recommandationId`) REFERENCES `Recommandations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calendars` ADD CONSTRAINT `Calendars_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calendars` ADD CONSTRAINT `Calendars_streamingPlatformId_fkey` FOREIGN KEY (`streamingPlatformId`) REFERENCES `StreamingPlatforms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Claims` ADD CONSTRAINT `Claims_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Claims` ADD CONSTRAINT `Claims_rewardId_fkey` FOREIGN KEY (`rewardId`) REFERENCES `Rewards`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rewards` ADD CONSTRAINT `Rewards_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watch` ADD CONSTRAINT `Watch_episode_id_fkey` FOREIGN KEY (`episode_id`) REFERENCES `Episodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watch` ADD CONSTRAINT `Watch_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthorsOnAnimes` ADD CONSTRAINT `AuthorsOnAnimes_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `Animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthorsOnAnimes` ADD CONSTRAINT `AuthorsOnAnimes_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Authors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Animes` ADD CONSTRAINT `Animes_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seasons` ADD CONSTRAINT `Seasons_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `Animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Episodes` ADD CONSTRAINT `Episodes_seasonId_fkey` FOREIGN KEY (`seasonId`) REFERENCES `Seasons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ThemesOnAnimes` ADD CONSTRAINT `ThemesOnAnimes_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `Animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ThemesOnAnimes` ADD CONSTRAINT `ThemesOnAnimes_themeId_fkey` FOREIGN KEY (`themeId`) REFERENCES `Themes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimeTypesOnAnimes` ADD CONSTRAINT `AnimeTypesOnAnimes_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `Animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimeTypesOnAnimes` ADD CONSTRAINT `AnimeTypesOnAnimes_animeTypeId_fkey` FOREIGN KEY (`animeTypeId`) REFERENCES `AnimeTypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GenderOnAnimes` ADD CONSTRAINT `GenderOnAnimes_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `Animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GenderOnAnimes` ADD CONSTRAINT `GenderOnAnimes_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `Gender`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudiosOnAnimes` ADD CONSTRAINT `StudiosOnAnimes_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `Animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudiosOnAnimes` ADD CONSTRAINT `StudiosOnAnimes_studioId_fkey` FOREIGN KEY (`studioId`) REFERENCES `Studios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
