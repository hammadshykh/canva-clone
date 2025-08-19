import { query } from "./_generated/server";

export const GetAllTemplates = query({
 args: {},
 handler: async (ctx, args) => {
  const result = ctx.db.query("templates").collect();
  return result;
 },
});
