CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"access_token" text,
	"access_token_expires" timestamp,
	"refresh_token" text,
	"refresh_token_expires" timestamp,
	"scope" text,
	"id_token" text,
	"password_hash" text,
	"created" timestamp DEFAULT now(),
	"updated" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" serial PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires" timestamp NOT NULL,
	"created" timestamp DEFAULT now(),
	"updated" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "token" text NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "expires_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "created" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "updated" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;