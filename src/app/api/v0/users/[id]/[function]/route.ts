import { api } from "@/services/api";
import { updateUserSchema } from "@/services/db/schemas/users";
import { errorMessage } from "@/utils/error-message";

type Functions = "update" | "generate-recommendations";

export async function POST(
	req: Request,
	{ params }: { params: { id: string; function: Functions } },
) {
	console.log(params);
	try {
		switch (params.function) {
			case "update": {
				const body = await req.json();

				const parsed = updateUserSchema.safeParse(body);

				if (parsed.success === false) {
					return Response.json(parsed.error, { status: 400 });
				}

				const user = await api.users.update(params.id, parsed.data);

				return Response.json(user, { status: 200 });
			}
			case "generate-recommendations": {
				const user = await api.users.generateRecommendations(params.id);

				return Response.json(user, { status: 200 });
			}
			default:
				break;
		}
	} catch (error) {
		console.error(error);
		return Response.json({ message: errorMessage(error) }, { status: 500 });
	}
}
