import { db, users } from "@/services/db";
import type { InsertUser } from "@/services/db/schemas/users";

export const usersApi = {
	async create(data: InsertUser) {
		try {
			const [user] = await db.insert(users).values(data).returning();

			return user;
		} catch (error) {
			console.error(`Can't create user with data: ${data}. Error: ${error}`);
			throw error;
		}
	},
};
