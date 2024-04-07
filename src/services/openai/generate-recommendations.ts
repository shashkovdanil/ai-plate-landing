import { z } from "zod";

import type { User } from "@/services/db/schemas/users";
import { openai } from "./client";

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

type Params = Pick<
	User,
	| "age"
	| "gender"
	| "weight"
	| "height"
	| "activityLevel"
	| "goal"
	| "disabilities"
>;

export async function generateRecommendations({
	age,
	gender,
	weight,
	height,
	activityLevel,
	goal,
	disabilities,
}: Params) {
	const completion = await openai.chat.completions.create({
		model: "gpt-4-turbo-preview",
		messages: [
			{
				role: "system",
				content: `
Given the following user data:
- Age: ${age}
- Gender: ${gender}
- Weight: ${weight}
- Height: ${height}
- Activity Level: ${activityLevel}
- Goal: ${goal}
${disabilities ? `- Disabilities: ${disabilities}` : ""}

Please generate the following information:
- Metabolic Rate
- Daily Water (Calculate personal water ration per day in ml, it should be integer)
- Daily Calories (Calculate daily caloric intake in kcal depending on the user's goal and activity level)
- Daily Proteins
- Daily Fats
- Daily Carbs
- Nutrition Recommendations (These should be dietary and lifestyle recommendations, they should be clear and simple. Don't use data what you calculated above. It should be regular string, maximum 800 characters)
- Supplement Recommendations (Recommend supplements if needed based on the user's data. It should be ordered list, split with "\n". Important: the benefits of these supplements must necessarily be confirmed by medical studies)

Respond with the following JSON format:
{
  "data": {
    "metabolicRate": number,
		"dailyWater": number,
    "dailyCalories": number,
    "dailyProteins": number,
    "dailyFats": number,
    "dailyCarbs": number,
    "nutritionRecommendations": string,
		"supplementRecommendations": string
  }
}
`,
			},
		],
		stream: false,
		response_format: {
			type: "json_object",
		},
	});

	const parsed = schema.safeParse(
		JSON.parse(completion.choices[0]?.message.content || "{}"),
	);

	if (parsed.success === false) {
		console.error(parsed.error);
		throw new Error("Failed to parse response from OpenAI");
	}

	return parsed.data;
}
