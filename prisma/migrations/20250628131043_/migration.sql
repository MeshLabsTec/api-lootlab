-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('DAILY', 'WEEKLY', 'UNIQUE', 'PROGRESSIVE');

-- CreateEnum
CREATE TYPE "RewardType" AS ENUM ('MYSTERY_BOX', 'XP_BOOST', 'SKIN', 'WEAPON', 'EMOTE', 'STICKER', 'BADGE', 'KEY_CODE', 'GAME_ITEM', 'CURRENCY', 'TOKEN', 'NFT_CHARACTER', 'NFT_WEAPON', 'NFT_ACCESSORY', 'NFT_BADGE', 'NFT_MYSTERY_BOX', 'NFT_BREEDING_RIGHTS', 'WHITELIST_SPOT', 'BETA_ACCESS');

-- CreateEnum
CREATE TYPE "CodeType" AS ENUM ('STEAM_KEY', 'GIFT_CARD', 'PROMO_CODE', 'REDEEM_CODE', 'BETA_ACCESS', 'CUSTOM_CODE');

-- CreateEnum
CREATE TYPE "RarityType" AS ENUM ('COMMON', 'RARE', 'EPIC', 'LEGENDARY', 'MYTHIC');

-- CreateEnum
CREATE TYPE "SmartContractRewardType" AS ENUM ('TOKEN', 'NFT_CHARACTER', 'NFT_WEAPON', 'NFT_ACCESSORY', 'NFT_BADGE', 'NFT_MYSTERY_BOX', 'NFT_BREEDING_RIGHTS', 'WHITELIST_SPOT', 'BETA_ACCESS');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PENDING', 'APPROVED', 'DELIVERED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "DeliveryMethod" AS ENUM ('MANUAL_MINT', 'AIRDROP', 'TRANSFER', 'BATCH_DELIVERY');

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "network_secondary" SET DEFAULT ARRAY[]::VARCHAR(255)[],
ALTER COLUMN "platform" SET DEFAULT ARRAY[]::VARCHAR(255)[];

-- CreateTable
CREATE TABLE "battle_pass_seasons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "maxTier" INTEGER NOT NULL DEFAULT 100,
    "xpPerTier" INTEGER NOT NULL DEFAULT 1000,
    "boostMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "battle_pass_seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "battle_pass_tier_configs" (
    "id" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "tier" INTEGER NOT NULL,
    "requiredXp" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "battle_pass_tier_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "battle_pass_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "currentXp" INTEGER NOT NULL DEFAULT 0,
    "currentTier" INTEGER NOT NULL DEFAULT 1,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "premiumPurchasedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "battle_pass_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "xpReward" INTEGER NOT NULL,
    "taskType" "TaskType" NOT NULL,
    "maxCompletions" INTEGER,
    "requirements" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_tasks" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "completions" INTEGER NOT NULL DEFAULT 0,
    "lastCompleted" TIMESTAMP(3),
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rewards" (
    "id" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rewardType" "RewardType" NOT NULL,
    "requiredXp" INTEGER NOT NULL,
    "tier" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isPremiumOnly" BOOLEAN NOT NULL DEFAULT false,
    "codePoolSize" INTEGER,
    "mysteryBoxRarity" "RarityType",
    "mysteryBoxItems" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_rewards" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rewardId" TEXT NOT NULL,
    "claimedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isClaimed" BOOLEAN NOT NULL DEFAULT true,
    "codeId" TEXT,
    "mysteryBoxOpened" BOOLEAN NOT NULL DEFAULT false,
    "mysteryBoxItem" JSONB,
    "mysteryBoxOpenedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reward_codes" (
    "id" TEXT NOT NULL,
    "rewardId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "codeType" "CodeType" NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "usedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reward_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_codes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "claimedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "reviewText" TEXT,
    "categories" JSONB,
    "xpEarned" INTEGER NOT NULL DEFAULT 20,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "smart_contract_rewards" (
    "id" TEXT NOT NULL,
    "rewardId" TEXT NOT NULL,
    "rewardType" "SmartContractRewardType" NOT NULL,
    "contractAddress" TEXT,
    "tokenId" TEXT,
    "amount" TEXT,
    "metadata" JSONB,
    "deliveryStatus" "DeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "claimedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveredAt" TIMESTAMP(3),
    "transactionHash" TEXT,
    "deliveredBy" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "smart_contract_rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "smart_contract_deliveries" (
    "id" TEXT NOT NULL,
    "rewardId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "deliveryMethod" "DeliveryMethod" NOT NULL,
    "transactionHash" TEXT,
    "blockNumber" INTEGER,
    "gasUsed" TEXT,
    "notes" TEXT,
    "deliveredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "smart_contract_deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "battle_pass_tier_configs_seasonId_tier_key" ON "battle_pass_tier_configs"("seasonId", "tier");

-- CreateIndex
CREATE UNIQUE INDEX "battle_pass_progress_userId_seasonId_key" ON "battle_pass_progress"("userId", "seasonId");

-- CreateIndex
CREATE UNIQUE INDEX "user_tasks_userId_taskId_key" ON "user_tasks"("userId", "taskId");

-- CreateIndex
CREATE UNIQUE INDEX "user_rewards_userId_rewardId_key" ON "user_rewards"("userId", "rewardId");

-- CreateIndex
CREATE UNIQUE INDEX "reward_codes_code_key" ON "reward_codes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "user_codes_codeId_key" ON "user_codes"("codeId");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_userId_postId_key" ON "reviews"("userId", "postId");

-- AddForeignKey
ALTER TABLE "battle_pass_tier_configs" ADD CONSTRAINT "battle_pass_tier_configs_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "battle_pass_seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battle_pass_progress" ADD CONSTRAINT "battle_pass_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battle_pass_progress" ADD CONSTRAINT "battle_pass_progress_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "battle_pass_seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "battle_pass_seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tasks" ADD CONSTRAINT "user_tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tasks" ADD CONSTRAINT "user_tasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "battle_pass_seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_rewards" ADD CONSTRAINT "user_rewards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_rewards" ADD CONSTRAINT "user_rewards_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "rewards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_rewards" ADD CONSTRAINT "user_rewards_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "reward_codes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reward_codes" ADD CONSTRAINT "reward_codes_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "rewards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_codes" ADD CONSTRAINT "user_codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_codes" ADD CONSTRAINT "user_codes_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "reward_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "smart_contract_rewards" ADD CONSTRAINT "smart_contract_rewards_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "rewards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "smart_contract_deliveries" ADD CONSTRAINT "smart_contract_deliveries_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "smart_contract_rewards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
