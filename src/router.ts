import type { Route } from '@std/http/unstable-route';

import { STATUS_CODE, STATUS_TEXT } from '@std/http';
import { route } from '@std/http/unstable-route';
import LED from './LED.ts';
import { PROPERTY } from './types.ts';

const routes: Route[] = [
	{
		'method': 'GET',
		pattern: new URLPattern({ 'pathname': '/power/status' }),
		handler: () => Response.json({ 'power': LED.power }),
	},
	{
		'method': 'PUT',
		pattern: new URLPattern({ 'pathname': '/power/update' }),
		handler: async (request: Request) => await update(request, PROPERTY.POWER),
	},
	{
		'method': 'GET',
		pattern: new URLPattern({ 'pathname': '/brightness/status' }),
		handler: () => Response.json({ 'brightness': LED.brightness }),
	},
	{
		'method': 'PUT',
		pattern: new URLPattern({ 'pathname': '/brightness/update' }),
		handler: async (request: Request) => await update(request, PROPERTY.BRIGHTNESS),
	},
	{
		'method': 'GET',
		pattern: new URLPattern({ 'pathname': '/colour/hue/status' }),
		handler: () => Response.json({ 'hue': LED.hue }),
	},
	{
		'method': 'PUT',
		pattern: new URLPattern({ 'pathname': '/colour/hue/update' }),
		handler: async (request: Request) => await update(request, PROPERTY.HUE),
	},
	{
		'method': 'GET',
		pattern: new URLPattern({ 'pathname': '/colour/saturation/status' }),
		handler: () => Response.json({ 'saturation': LED.saturation }),
	},
	{
		'method': 'PUT',
		pattern: new URLPattern({ 'pathname': '/colour/saturation/update' }),
		handler: async (request: Request) => await update(request, PROPERTY.SATURATION),
	},
	{
		'method': 'GET',
		pattern: new URLPattern({ 'pathname': '/colour/temperature/status' }),
		handler: () => Response.json({ 'temperature': LED.temperature }),
	},
	{
		'method': 'PUT',
		pattern: new URLPattern({ 'pathname': '/colour/temperature/update' }),
		handler: async (request: Request) => await update(request, PROPERTY.TEMPERATURE),
	},
	{
		'method': 'GET',
		pattern: new URLPattern({ 'pathname': '/effect/status' }),
		handler: () => Response.json({ 'effect': LED.effect }),
	},
	{
		'method': 'PUT',
		pattern: new URLPattern({ 'pathname': '/effect/update' }),
		handler: async (request: Request) => await update(request, PROPERTY.EFFECT),
	},
];

async function update(request: Request, property: keyof typeof PROPERTY): Promise<Response> {
	switch (property) {
		case PROPERTY.POWER:
			LED.power = await request.json();
			break;
		case PROPERTY.BRIGHTNESS:
			LED.brightness = await request.json();
			break;
		case PROPERTY.HUE:
			LED.hue = await request.json();
			break;
		case PROPERTY.SATURATION:
			LED.saturation = await request.json();
			break;
		case PROPERTY.TEMPERATURE:
			LED.temperature = await request.json();
			break;
		case PROPERTY.EFFECT:
			LED.effect = await request.json();
			break;
	}

	return new Response(STATUS_TEXT[STATUS_CODE.OK], { 'status': STATUS_CODE.OK });
}

function defaultHandler(_: Request): Response {
	return new Response(STATUS_TEXT[STATUS_CODE.NotFound], { 'status': STATUS_CODE.NotFound });
}

export default route(routes, defaultHandler);
