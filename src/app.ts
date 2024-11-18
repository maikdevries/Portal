import router from './router.ts';

const PORT = Number.parseInt(Deno.env.get('PORT') ?? '');

Deno.serve({ 'port': PORT }, async (request: Request) => await router(request));
