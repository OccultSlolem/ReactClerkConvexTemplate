import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  counts: defineTable({
    id: v.string(),
    count: v.number(),
  })
});
