import { index, pgTable, serial } from "drizzle-orm/pg-core";

export const platesToPresets = pgTable(
	"plates_to_presets",
	{
		id: serial("id").primaryKey(),
		plateId: serial("plate_id").notNull(),
		presetId: serial("preset_id").notNull(),
	},
	(table) => {
		return {
			idIdx: index("plates_to_preset_id_idx").on(table.id),
			plateIdx: index("plates_to_preset_plate_idx").on(table.plateId),
			presetIdx: index("plates_to_preset_preset_idx").on(table.presetId),
		};
	},
);
