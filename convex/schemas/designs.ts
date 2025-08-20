// convex/schema/designs.ts
import { defineTable } from "convex/server";
import { v } from "convex/values";

export const designs = defineTable({
 name: v.string(),
 width: v.float64(),
 height: v.float64(),
 uid: v.id("users"),
 jsonTemplate: v.optional(v.any()),
 imagePreview: v.optional(v.any()),
 createdAt: v.optional(v.number()), // Add this field
 id: v.optional(v.string()),
});
