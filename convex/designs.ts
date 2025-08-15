// convex/designs.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateNewDesign = mutation({
 args: {
  name: v.string(),
  width: v.number(),
  height: v.number(),
  uid: v.id("users"), // foreign key to users table
 },
 handler: async (ctx, args) => {
  // Optional: check if a design with same name & user already exists
  const existing = await ctx.db
   .query("designs")
   .filter((q) =>
    q.and(q.eq(q.field("name"), args.name), q.eq(q.field("uid"), args.uid))
   )
   .collect();

  if (existing.length === 0) {
   const designId = await ctx.db.insert("designs", {
    name: args.name,
    width: args.width,
    height: args.height,
    uid: args.uid,
   });

   return designId; // returns the inserted design's ID
  }

  // If already exists, return the first one
  return existing[0];
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
