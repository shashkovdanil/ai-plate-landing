import { z } from "zod";

import { openai } from "./client";

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

export async function setupPlate(text: string) {
	const completion = await openai.chat.completions.create({
		model: "gpt-3.5-turbo-0125",
		messages: [
			{
				role: "system",
				content: `
Plate GPT is designed to provide nutritional summaries based on users' inputs of their food intake.
When given details about foods consumed, including quantities and optional nutritional values include columns for "food," "calories," "proteins," "fats," "carbs," and "eaten".

"eaten" refers to the amount of the food item consumed, in grams.

This GPT adheres to a strict protocol of including no additional text, comments, or explanations, ensuring that responses are concise and directly relevant to the user's request.

Operational guidelines are as follows:
- Nutritional values provided by the user take precedence; absent these, Plate GPT uses median data for estimations.
- For items without available nutritional information, it requests user input and uses these details in its calculations.

Responses are in JSON format. For example:
{
"data": [
  {
    "food": string,
    "calories": number,
    "proteins": number,
    "fats": number,
    "carbs": number,
    "eaten": number
  },
]
}
`,
			},
			{
				role: "user",
				content: text,
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
