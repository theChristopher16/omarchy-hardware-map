import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const reports = sqliteTable('reports', {
  id: text('id').primaryKey(), device: text('device').notNull(), component: text('component').notNull(),
  status: text('status').notNull(), version: text('version').notNull(), summary: text('summary').notNull(),
  source: text('source').notNull(), authorId: text('author_id').notNull(), createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at'), archivedAt: text('archived_at'), kind: text('kind').notNull().default('Community report'), specs: text('specs').notNull().default('{}'), buildStage: text('build_stage').notNull().default('Unknown'),
});
export const moderators = sqliteTable('moderators', {id:text('id').primaryKey(), createdAt:text('created_at').notNull(), role:text('role').notNull().default('moderator')});
export const proposals = sqliteTable('proposals', {
  id:text('id').primaryKey(), reportId:text('report_id'), authorId:text('author_id').notNull(), action:text('action').notNull(), state:text('state').notNull(),
  device:text('device').notNull(), component:text('component').notNull(), status:text('status').notNull(), version:text('version').notNull(), summary:text('summary').notNull(), source:text('source').notNull(),
  specs:text('specs').notNull().default('{}'), buildStage:text('build_stage').notNull().default('Unknown'), baseUpdatedAt:text('base_updated_at'), createdAt:text('created_at').notNull(), reviewedAt:text('reviewed_at'), reviewerId:text('reviewer_id'), reviewNote:text('review_note'),
});
export const claims = sqliteTable('claims', {reportId:text('report_id').primaryKey(), userId:text('user_id').notNull(), handle:text('handle').notNull(), expiresAt:text('expires_at').notNull()});
