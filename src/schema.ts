import { db } from "@/services/db";
import { buildSchema } from "drizzle-graphql";

const { schema } = buildSchema(db);

export { schema };
