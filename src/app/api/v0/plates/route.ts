import { api } from "@/services/api";
import { errorMessage } from "@/utils/error-message";
import { objectKeys } from "@/utils/object-keys";

type Schema = {
	[K in keyof typeof api.plates]: Parameters<(typeof api.plates)[K]>;
};

export async function POST(req: Request) {
	try {
		const body = (await req.json()) as Schema;

		for (const key of objectKeys(body)) {
			const fn = api.plates[key];

			if (!fn) {
				return Response.json(
					{ message: `Incorrect function ${key}` },
					{ status: 400 },
				);
			}

			const params = body[key];

			// @ts-ignore
			const result = await fn(...params);

			return Response.json(result, { status: 200 });
		}
	} catch (error) {
		console.error(error);
		return Response.json({ message: errorMessage(error) }, { status: 500 });
	}
}
