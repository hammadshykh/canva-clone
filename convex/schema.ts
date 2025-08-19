// convex/schema/index.ts
import { defineSchema } from "convex/server";
import { users } from "./schemas/users";
import { designs } from "./schemas/designs";
import { templates } from "./schemas/templates";

export default defineSchema({
 users,
 designs,
 templates,
});
