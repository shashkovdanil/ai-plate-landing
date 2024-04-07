import { db } from "@/services/db";
import { sql } from "drizzle-orm";
import { afterAll, describe, expect, it } from "vitest";
import { api } from "./index";

describe("users api", () => {
	it("create", async () => {
		const user = await api.users.create({
			id: "1",
		});

		expect(user.id).toBe("1");
	});

	it("setup", async () => {
		const user = await api.users.update("1", {
			email: "test@gmail.com",
			age: 20,
			gender: "male",
			weight: 70,
			height: 180,
			activityLevel: "low",
			goal: "weight_loss",
		});

		expect(user.email).toBe("test@gmail.com");
		expect(user.age).toBe(20);
		expect(user.gender).toBe("male");
		expect(user.weight).toBe(70);
		expect(user.height).toBe(180);
		expect(user.activityLevel).toBe("low");
		expect(user.goal).toBe("weight_loss");
	});

	it(
		"generate recommendations",
		async () => {
			const user = await api.users.generateRecommendations("1");

			expect(user.metabolicRate).toBeTypeOf("number");
			expect(user.dailyWater).toBeTypeOf("number");
			expect(user.dailyCalories).toBeTypeOf("number");
			expect(user.dailyProteins).toBeTypeOf("number");
			expect(user.dailyFats).toBeTypeOf("number");
			expect(user.dailyCarbs).toBeTypeOf("number");
			expect(user.nutritionRecommendations).toBeTypeOf("string");
			expect(user.supplementRecommendations).toBeTypeOf("string");
		},
		{
			timeout: 60000,
		},
	);

	it("full access", async () => {
		const user = await api.users.update("1", {
			fullAccess: true,
		});

		expect(user.fullAccess).toBe(true);
	});

	afterAll(async () => {
		const query = sql.raw("TRUNCATE TABLE users CASCADE;");

		await db.execute(query);
	});
});
