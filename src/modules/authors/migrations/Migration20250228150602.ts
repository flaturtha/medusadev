import { Migration } from '@mikro-orm/migrations';

export class Migration20250228150602 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "author" ("id" text not null, "name" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "author_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_author_deleted_at" ON "author" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "author" cascade;`);
  }

}
