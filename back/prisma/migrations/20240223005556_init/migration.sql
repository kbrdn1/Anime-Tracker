-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `token_created_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `Users_username_key`(`username`),
    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `data` JSON NOT NULL,
    `is_read` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NOT NULL,

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
    `user_id` INTEGER NOT NULL,
    `favorite_id` INTEGER NOT NULL,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`, `favorite_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Watchlist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animes_ids` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WatchlistOnUsers` (
    `user_id` INTEGER NOT NULL,
    `watchlist_id` INTEGER NOT NULL,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`, `watchlist_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Top5` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animes_ids` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Top5OnUsers` (
    `user_id` INTEGER NOT NULL,
    `top5_id` INTEGER NOT NULL,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`, `top5_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recommandations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animes_ids` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecommandationsOnUsers` (
    `user_id` INTEGER NOT NULL,
    `recommandation_id` INTEGER NOT NULL,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`, `recommandation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Calendars` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NOT NULL,
    `streaming_platform_id` INTEGER NOT NULL,

    UNIQUE INDEX `Calendars_user_id_key`(`user_id`),
    UNIQUE INDEX `Calendars_streaming_platform_id_key`(`streaming_platform_id`),
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
    `user_id` INTEGER NOT NULL,
    `reward_id` INTEGER NOT NULL,

    UNIQUE INDEX `Claims_user_id_key`(`user_id`),
    UNIQUE INDEX `Claims_reward_id_key`(`reward_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rewards` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `badge` VARCHAR(191) NOT NULL,
    `condition` INTEGER NOT NULL,
    `type_id` INTEGER NOT NULL,

    UNIQUE INDEX `Rewards_type_id_key`(`type_id`),
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
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `original_firstname` VARCHAR(191) NULL,
    `original_lastname` VARCHAR(191) NULL,
    `bio` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuthorsOnAnimes` (
    `anime_id` INTEGER NOT NULL,
    `author_id` INTEGER NOT NULL,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `AuthorsOnAnimes_anime_id_key`(`anime_id`),
    PRIMARY KEY (`anime_id`, `author_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Animes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `japanese_title` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `jacket_img` VARCHAR(191) NULL,
    `banner_img` VARCHAR(191) NULL,
    `puplished_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `crunchyroll_ref` VARCHAR(191) NULL,
    `adn_ref` VARCHAR(191) NULL,
    `my_anime_list_ref` VARCHAR(191) NULL,
    `status_id` INTEGER NOT NULL,

    UNIQUE INDEX `Animes_status_id_key`(`status_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seasons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `puplished_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `anime_id` INTEGER NOT NULL,

    UNIQUE INDEX `Seasons_anime_id_key`(`anime_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Episodes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `puplish_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `season_id` INTEGER NOT NULL,

    UNIQUE INDEX `Episodes_season_id_key`(`season_id`),
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
    `anime_id` INTEGER NOT NULL,
    `theme_id` INTEGER NOT NULL,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`anime_id`, `theme_id`)
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
    `anime_id` INTEGER NOT NULL,
    `anime_type_id` INTEGER NOT NULL,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`anime_id`, `anime_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Statuses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GendersOnAnimes` (
    `anime_id` INTEGER NOT NULL,
    `gender_id` INTEGER NOT NULL,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`anime_id`, `gender_id`)
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
    `anime_id` INTEGER NOT NULL,
    `studio_id` INTEGER NOT NULL,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`anime_id`, `studio_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoritesOnUsers` ADD CONSTRAINT `FavoritesOnUsers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoritesOnUsers` ADD CONSTRAINT `FavoritesOnUsers_favorite_id_fkey` FOREIGN KEY (`favorite_id`) REFERENCES `Favorites`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WatchlistOnUsers` ADD CONSTRAINT `WatchlistOnUsers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WatchlistOnUsers` ADD CONSTRAINT `WatchlistOnUsers_watchlist_id_fkey` FOREIGN KEY (`watchlist_id`) REFERENCES `Watchlist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Top5OnUsers` ADD CONSTRAINT `Top5OnUsers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Top5OnUsers` ADD CONSTRAINT `Top5OnUsers_top5_id_fkey` FOREIGN KEY (`top5_id`) REFERENCES `Top5`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecommandationsOnUsers` ADD CONSTRAINT `RecommandationsOnUsers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecommandationsOnUsers` ADD CONSTRAINT `RecommandationsOnUsers_recommandation_id_fkey` FOREIGN KEY (`recommandation_id`) REFERENCES `Recommandations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calendars` ADD CONSTRAINT `Calendars_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calendars` ADD CONSTRAINT `Calendars_streaming_platform_id_fkey` FOREIGN KEY (`streaming_platform_id`) REFERENCES `StreamingPlatforms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Claims` ADD CONSTRAINT `Claims_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Claims` ADD CONSTRAINT `Claims_reward_id_fkey` FOREIGN KEY (`reward_id`) REFERENCES `Rewards`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rewards` ADD CONSTRAINT `Rewards_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `Types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watch` ADD CONSTRAINT `Watch_episode_id_fkey` FOREIGN KEY (`episode_id`) REFERENCES `Episodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watch` ADD CONSTRAINT `Watch_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthorsOnAnimes` ADD CONSTRAINT `AuthorsOnAnimes_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `Animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthorsOnAnimes` ADD CONSTRAINT `AuthorsOnAnimes_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `Authors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Animes` ADD CONSTRAINT `Animes_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `Statuses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seasons` ADD CONSTRAINT `Seasons_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `Animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Episodes` ADD CONSTRAINT `Episodes_season_id_fkey` FOREIGN KEY (`season_id`) REFERENCES `Seasons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ThemesOnAnimes` ADD CONSTRAINT `ThemesOnAnimes_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `Animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ThemesOnAnimes` ADD CONSTRAINT `ThemesOnAnimes_theme_id_fkey` FOREIGN KEY (`theme_id`) REFERENCES `Themes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimeTypesOnAnimes` ADD CONSTRAINT `AnimeTypesOnAnimes_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `Animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimeTypesOnAnimes` ADD CONSTRAINT `AnimeTypesOnAnimes_anime_type_id_fkey` FOREIGN KEY (`anime_type_id`) REFERENCES `AnimeTypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GendersOnAnimes` ADD CONSTRAINT `GendersOnAnimes_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `Animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GendersOnAnimes` ADD CONSTRAINT `GendersOnAnimes_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `Genders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudiosOnAnimes` ADD CONSTRAINT `StudiosOnAnimes_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `Animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudiosOnAnimes` ADD CONSTRAINT `StudiosOnAnimes_studio_id_fkey` FOREIGN KEY (`studio_id`) REFERENCES `Studios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
