import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export interface Response {
  code: number;
  message: string;
}
export const ok: Response = { code: 200, message: 'OK' };
export const notFound: Response = { code: 404, message: 'Not Found' };
export const unauthorized: Response = { code: 401, message: 'Unauthorized' };
export const forbidden: Response = { code: 403, message: 'Forbidden' };
export const badRequest: Response = { code: 400, message: 'Bad Request' };
export const internalError: Response = { code: 500, message: 'Internal Error' };

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

interface GetCountsResponse extends Response {
  globalCount?: number;
  userCount?: number;
}
export const getCounts = query({
  args: {},
  handler: async (ctx, _): Promise<GetCountsResponse> => {
    const id = await ctx.auth.getUserIdentity();
    const globalCount = await ctx.db.query('counts')
      .filter((q) => q.eq(q.field('id'), 'global'))
      .first();
    
    if (!id) {
      return {
        ...ok,
        globalCount: globalCount?.count || 0,
      };
    }

    const userCount = await ctx.db.query('counts')
      .filter((q) => q.eq(q.field('id'), id.tokenIdentifier))
      .first();
    
    return {
      ...ok,
      globalCount: globalCount?.count,
      userCount: userCount?.count,
    };
  },
});

export const updateCount = mutation({
  args: {
    targetCount: v.union(v.literal('global'), v.literal('user')),
    action: v.union(v.literal('increment'), v.literal('decrement')),
  },
  handler: async (ctx, args): Promise<Response> => {
    const { targetCount, action } = args;
    const id = await ctx.auth.getUserIdentity();

    if (targetCount === 'user' && !id) {
      return unauthorized;
    }

    const count = await ctx.db.query('counts')
      .filter((q) => q.eq(
        q.field('id'), targetCount === 'user' ? id?.tokenIdentifier : 'global'
        ))
      .first();

    if (!count && targetCount === 'user') {
      if (!id) {
        return unauthorized;
      }

      await ctx.db.insert('counts', {
        id: id.tokenIdentifier,
        count: action === 'increment' ? 1 : -1, // The user would have to have a count of 0 to increment or decrement
      });
      return ok;
    }

    if (count?.count === undefined) return internalError; // 0 is Falsy, so we specifically check for undefined

    let newCount = action === 'increment' ? count.count + 1 : count.count - 1;

    await ctx.db.patch(count._id, { count: newCount });

    return ok;
  }
});
