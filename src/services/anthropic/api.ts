import type { User } from "@/services/db/schemas/users";
import { extractJSON } from "@/utils/extract-json";
import { z } from "zod";
import { anthropic } from "./client";

export class Anthropic {
	async generatePlate() {}
	async generateDailyNormsAndRecommendations({
		age,
		gender,
		weight,
		height,
		activityLevel,
		goal,
		disabilities,
	}: Pick<
		User,
		| "age"
		| "gender"
		| "weight"
		| "height"
		| "activityLevel"
		| "goal"
		| "disabilities"
	>) {
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
			model: "claude-3-sonnet-20240229",
			messages: [
				{
					role: "user",
					content: `Given the following user data:
- Age: ${age}
- Gender: ${gender}
- Weight: ${weight}
- Height: ${height}
- Activity Level: ${activityLevel}
- Goal: ${goal}
${disabilities ? `- Disabilities: ${disabilities}` : ""}

Please generate the following personalized information:

- Metabolic Rate: Calculate the user's basal metabolic rate based on the provided data.
- Daily Water: Determine the optimal daily water intake in ml (integer) for the user.
- Daily Calories: Calculate the recommended daily caloric intake in kcal based on the user's goal and activity level.
- Macronutrient Breakdown: Provide the recommended daily amounts of proteins, fats, and carbs in grams.
- Nutrition Recommendations: Offer clear and concise dietary and lifestyle recommendations tailored to the user's needs and goals. Include examples of healthy food choices and meal plans. Maybe some lifehacks or tips.
- Supplement Recommendations: If applicable, suggest supplements that may benefit the user based on their data. Provide links to relevant medical studies supporting the benefits of each supplement to enhance user confidence.

Use JSON format:
{
  "data": {
    "metabolicRate": number,
    "dailyWater": number,
    "dailyCalories": number,
    "dailyProteins": number,
    "dailyFats": number,
    "dailyCarbs": number,
    "nutritionRecommendations": string, // Markdown
    "supplementRecommendations": string // Markdown
  }
}`,
				},
				{
					role: "assistant",
					content:
						"Respond with JSON format, don't add any additional text. The response should be parsed without errors with the JSON.parse function",
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
			throw new Error("Failed to parse response from Anthropic AI");
		}

		return parsed.data.data;
	}
}
