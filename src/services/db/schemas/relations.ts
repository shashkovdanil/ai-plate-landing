import { relations } from "drizzle-orm";

import { plates } from "./plates";
import { presets } from "./presets";
import { users } from "./users";

export const usersRelations = relations(users, ({ many }) => ({
	plates: many(plates),
}));

export const platesRelations = relations(plates, ({ one }) => ({
	user: one(users, {
		fields: [plates.userId],
		references: [users.id],
	}),
}));

export const presetsRelations = relations(presets, ({ many }) => ({
	plates: many(plates),
}));
