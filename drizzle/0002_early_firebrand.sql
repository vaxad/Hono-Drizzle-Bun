ALTER TABLE "posts" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
