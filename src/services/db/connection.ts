import { drizzle } from "drizzle-orm/postgres-js";

import { env } from "@/env";
import * as schema from "@/services/db/schemas";
import postgres from "postgres";

const connectionString = env.DATABASE_URL;
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
