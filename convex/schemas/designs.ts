// convex/schema/designs.ts
import { defineTable } from "convex/server";
import { v } from "convex/values";

export const designs = defineTable({
 name: v.string(),
 width: v.number(),
 height: v.number(),
 jsonTemplate: v.optional(v.any()),
 imagePreview: v.optional(v.any()),
 uid: v.id("users"), // foreign key
});
