import { relations } from "drizzle-orm";
import { serial, text, timestamp, integer, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    userId: integer("userId")
        .notNull()
        .references(() => users.id),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const comments = pgTable("comments", {
    id: serial("id").primaryKey(),
    postId: integer("postId").references(() => posts.id),
    userId: integer("userId").references(() => users.id),
    text: text("text").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
    user: one(users, { fields: [posts.userId], references: [users.id] }),
    comments: many(comments),
}));

export const usersRelations = relations(users, ({ many }) => ({
    posts: many(posts),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
    post: one(posts, { fields: [comments.postId], references: [posts.id] }),
    user: one(users, { fields: [comments.userId], references: [users.id] }),
}));

export type User = typeof users.$inferSelect
export type Post = typeof posts.$inferSelect
export type Comment = typeof comments.$inferSelect
