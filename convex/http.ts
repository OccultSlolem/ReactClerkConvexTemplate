import { httpRouter } from 'convex/server';
import { httpAction } from './_generated/server';

const accessControlHeaders = httpAction(async () => {
  return new Response('{ message: \'OK\' }', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-challenge',
    }
  })
});

const fooRoute = httpAction(async (_, request) => {
  const j = await request.json();
  return new Response(JSON.stringify({ message: `Hello ${j.name}` }), {
    headers: {
      'Content-Type': 'application/json',
      // Don't forget to allow CORS and set the correct origin (this is an insecure example)
      'Access-Control-Allow-Origin': '*' 
    }
  });
});

const http = httpRouter();

http.route({
  path: '/foo',
  method: 'POST',
  handler: fooRoute,
});

http.route({
  path: '/foo',
  method: 'OPTIONS',
  handler: accessControlHeaders,
});

export default http;
