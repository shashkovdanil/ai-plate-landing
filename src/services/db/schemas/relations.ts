import { relations } from "drizzle-orm";

import { plates } from "./plates";
import { platesToPresets } from "./plates-to-presets";
import { presets } from "./presets";
import { recipes } from "./recipes";
import { users } from "./users";

export const usersRelations = relations(users, ({ many }) => ({
	plates: many(plates),
	recipes: many(recipes),
}));

export const platesRelations = relations(plates, ({ one, many }) => ({
	user: one(users, {
		fields: [plates.userId],
		references: [users.id],
	}),
	platesToPresets: many(platesToPresets),
}));

export const platesToPresetsRelations = relations(
	platesToPresets,
	({ one }) => ({
		plates: one(plates, {
			fields: [platesToPresets.plateId],
			references: [plates.id],
		}),
		presets: one(presets, {
			fields: [platesToPresets.presetId],
			references: [presets.id],
		}),
	}),
);

export const presetsRelations = relations(presets, ({ many }) => ({
	platesToPresets: many(platesToPresets),
}));

export const recipesRelations = relations(recipes, ({ one }) => ({
	user: one(users, {
		fields: [recipes.userId],
		references: [users.id],
	}),
}));
