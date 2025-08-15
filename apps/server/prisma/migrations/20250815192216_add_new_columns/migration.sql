-- AlterTable
ALTER TABLE "public"."products" ALTER COLUMN "image_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "is_email_verified" BOOLEAN NOT NULL DEFAULT false;
