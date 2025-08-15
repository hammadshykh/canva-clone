// convex/schema/users.ts
import { defineTable } from "convex/server";
import { v } from "convex/values";

export const users = defineTable({
 name: v.string(),
 email: v.string(),
 picture: v.string(),
 subscriptionId: v.optional(v.string()),
});
