import { db, plates } from "@/services/db";
import { and, eq, sql } from "drizzle-orm";

export const platesApi = {
	async getByDate(date: string, userId: string) {
		try {
			const plate = await db.query.plates.findFirst({
				where: and(
					sql`date(${plates.date}) = date(${date})`,
					eq(plates.userId, userId),
				),
			});

			if (!plate) {
				throw new Error(`Plate for date ${date} not found`);
			}

			return plate;
		} catch (error) {
			console.error(`Can't read plate. Error: ${error}`);
			throw error;
		}
	},
	async getByUserId(userId: string) {
		try {
			const plate = await db.query.plates.findFirst({
				where: eq(plates.userId, userId),
			});

			if (!plate) {
				throw new Error(`Plate with for user ${userId} not found`);
			}

			return plate;
		} catch (error) {
			console.error(`Can't read plate. Error: ${error}`);
			throw error;
		}
	},
	async createWithAI() {},
	async createManually() {},
	async update() {},
};

export const functions = [
	"getByDate",
	"createManually",
	"createWithAI",
	"getByUserId",
	"update",
] satisfies (keyof typeof platesApi)[];
