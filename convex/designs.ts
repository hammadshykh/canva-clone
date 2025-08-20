// convex/designs.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateNewDesign = mutation({
 args: {
  name: v.string(),
  width: v.float64(),
  height: v.float64(),
  uid: v.id("users"),
 },
 handler: async (ctx, args) => {
  // const existing = await ctx.db
  //  .query("designs")
  //  .filter((q) =>
  //   q.and(q.eq(q.field("name"), args.name), q.eq(q.field("uid"), args.uid))
  //  )
  //  .collect();

  // if (existing.length === 0) {
  return await ctx.db.insert("designs", args);
  // }
  // return existing[0]._id;
 },
});

export const GetDesign = query({
 args: {
  id: v.id("designs"),
 },
 handler: async (ctx, args) => {
  const result = await ctx.db.get(args.id);
  return result;
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
