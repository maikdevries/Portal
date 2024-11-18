import type { Route } from '@std/http';

import LED from './LED.ts';
import { route, STATUS_CODE, STATUS_TEXT } from '@std/http';

const routes: Route[] = [
	{
		'method': 'GET',
		pattern: new URLPattern({ 'pathname': '/power/status' }),
		handler: () => Response.json({ 'power': LED.power }),
	},
	{
		'method': 'PUT',
		pattern: new URLPattern({ 'pathname': '/power/update' }),
		handler: async (request: Request) => await update(request, Object.getOwnPropertyDescriptor(LED, 'power')?.set),
	},
	{
		'method': 'GET',
		pattern: new URLPattern({ 'pathname': '/brightness/status' }),
		handler: () => Response.json({ 'brightness': LED.brightness }),
	},
	{
		'method': 'PUT',
		pattern: new URLPattern({ 'pathname': '/brightness/update' }),
		handler: async (request: Request) => await update(request, Object.getOwnPropertyDescriptor(LED, 'brightness')?.set),
	},
	{
		'method': 'GET',
		pattern: new URLPattern({ 'pathname': '/colour/hue/status' }),
		handler: () => Response.json({ 'hue': LED.hue }),
	},
	{
		'method': 'PUT',
		pattern: new URLPattern({ 'pathname': '/colour/hue/update' }),
		handler: async (request: Request) => await update(request, Object.getOwnPropertyDescriptor(LED, 'hue')?.set),
	},
	{
		'method': 'GET',
		pattern: new URLPattern({ 'pathname': '/colour/saturation/status' }),
		handler: () => Response.json({ 'saturation': LED.saturation }),
	},
	{
		'method': 'PUT',
		pattern: new URLPattern({ 'pathname': '/colour/saturation/update' }),
		handler: async (request: Request) => await update(request, Object.getOwnPropertyDescriptor(LED, 'saturation')?.set),
	},
	{
		'method': 'GET',
		pattern: new URLPattern({ 'pathname': '/colour/temperature/status' }),
		handler: () => Response.json({ 'temperature': LED.temperature }),
	},
	{
		'method': 'PUT',
		pattern: new URLPattern({ 'pathname': '/colour/temperature/update' }),
		handler: async (request: Request) => await update(request, Object.getOwnPropertyDescriptor(LED, 'temperature')?.set),
	},
];

async function update(request: Request, setter?: (value: unknown) => void): Promise<Response> {
	if (!setter) return new Response(STATUS_TEXT[STATUS_CODE.NotImplemented], { 'status': STATUS_CODE.NotImplemented });

	try {
		setter(await request.json());
		return new Response(STATUS_TEXT[STATUS_CODE.OK], { 'status': STATUS_CODE.OK });
	} catch {
		return new Response(STATUS_TEXT[STATUS_CODE.BadRequest], { 'status': STATUS_CODE.BadRequest });
	}
}

function defaultHandler(_: Request): Response {
	return new Response(STATUS_TEXT[STATUS_CODE.NotFound], { 'status': STATUS_CODE.NotFound });
}

export default route(routes, defaultHandler);
