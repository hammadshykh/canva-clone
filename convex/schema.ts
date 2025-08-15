// convex/schema/index.ts
import { defineSchema } from "convex/server";
import { users } from "./schemas/users";
import { designs } from "./schemas/designs";

export default defineSchema({
 users,
 designs,
});
