import { DAILY_NORMS_AND_RECOMMENDATIONS, PLATE } from "@/constants/prompts";
import type { User } from "@/services/db/schemas/users";
import { extractJSON } from "@/utils/extract-json";
import { z } from "zod";
import { anthropic } from "./client";

export class Anthropic {
	async generatePlate(content: string) {
		const schema = z.object({
			data: z.array(
				z.object({
					food: z.string(),
					calories: z.number(),
					proteins: z.number(),
					fats: z.number(),
					carbs: z.number(),
					eaten: z.number(),
				}),
			),
		});

		const completion = await anthropic.messages.create({
			model: "claude-3-haiku-20240307",
			system: PLATE,
			messages: [
				{
					role: "user",
					content,
				},
			],
			max_tokens: 4096,
			stream: false,
		});

		const response = JSON.parse(
			extractJSON(completion.content[0]?.text || "{}"),
		);

		const parsed = schema.safeParse(response);

		if (parsed.success === false) {
			console.error(parsed.error);
			throw new Error(
				"[generatePlate] Failed to parse response from Anthropic AI",
			);
		}

		return parsed.data.data;
	}
	async generateDailyNormsAndRecommendations(
		params: Pick<
			User,
			| "age"
			| "gender"
			| "weight"
			| "height"
			| "activityLevel"
			| "goal"
			| "disabilities"
		>,
	) {
		const schema = z.object({
			data: z.object({
				metabolicRate: z.number(),
				dailyWater: z.number(),
				dailyCalories: z.number(),
				dailyProteins: z.number(),
				dailyFats: z.number(),
				dailyCarbs: z.number(),
				nutritionRecommendations: z.string(),
				supplementRecommendations: z.string().optional(),
			}),
		});

		const completion = await anthropic.messages.create({
			model: "claude-3-haiku-20240307",
			system: DAILY_NORMS_AND_RECOMMENDATIONS,
			messages: [
				{
					role: "user",
					content: JSON.stringify(params),
				},
			],
			max_tokens: 4096,
			stream: false,
		});

		const response = JSON.parse(
			extractJSON(completion.content[0]?.text || "{}"),
		);

		const parsed = schema.safeParse(response);

		if (parsed.success === false) {
			console.error(parsed.error);
			throw new Error(
				"[generateDailyNormsAndRecommendations] Failed to parse response from Anthropic AI",
			);
		}

		return parsed.data.data;
	}
}
