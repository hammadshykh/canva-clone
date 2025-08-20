// convex/designs.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// convex/designs.ts
export const CreateNewDesign = mutation({
 args: {
  name: v.string(),
  width: v.float64(),
  height: v.float64(),
  uid: v.id("users"),
  id: v.string(),
 },
 handler: async (ctx, args) => {
  // ALWAYS create a new design - no existing checks!
  const designId = await ctx.db.insert("designs", {
   name: args.name,
   width: args.width,
   height: args.height,
   uid: args.uid,
   id: args.id,
   createdAt: Date.now(), // Add timestamp for uniqueness
  });

  return designId; // This will always be a new unique ID
 },
});

export const GetDesign = query({
 args: {
  id: v.id("designs"),
 },
 handler: async (ctx, args) => {
  try {
   const result = await ctx.db.get(args.id);

   if (!result) {
    console.warn(`Design with ID ${args.id} not found`);
    return null;
   }

   return result;
  } catch (error) {
   console.error("Error fetching design:", error);
   throw new Error("Failed to fetch design");
  }
 },
});

export const SaveDesign = mutation({
 args: {
  id: v.id("designs"),
  jsonDesign: v.any(),
  imagePreview: v.string(),
 },
 handler: async (ctx, args) => {
  const result = await ctx.db.patch(args.id, {
   jsonTemplate: args?.jsonDesign,
   imagePreview: args?.imagePreview,
  });
  return result;
 },
});

export const GetUserDesigns = query({
 args: {
  id: v.id("users"),
 },
 handler: async (ctx, args) => {
  const result = ctx.db
   .query("designs")
   .filter((q) => q.eq(q.field("uid"), args.id))
   .collect();
  return result;
 },
});

export const CreateDesignFormTemplate = mutation({
 args: {
  name: v.string(),
  imagePreview: v.string(),
  jsonTemplate: v.any(),
  uuid: v.id("users"),
  height: v.number(),
  width: v.number(),
 },
 handler: async (ctx, args) => {
  const result = await ctx.db.insert("designs", {
   name: args.name,
   height: args.height,
   width: args.width,
   imagePreview: args.imagePreview,
   jsonTemplate: args.jsonTemplate,
   uid: args.uuid,
  });
  return result;
 },
});
