// convex/schema/designs.ts
import { defineTable } from "convex/server";
import { v } from "convex/values";

export const templates = defineTable({
 name: v.string(),
 jsonTemplate: v.any(),
 imagePreview: v.string(),
 active: v.boolean(),
 width: v.optional(v.float64()),
 height: v.optional(v.float64()),
});
