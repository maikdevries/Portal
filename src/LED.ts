import type { STRIP_TYPES } from '@maikdevries/rpi-ws281x';
import type { State } from './types.ts';

import Controller from '@maikdevries/rpi-ws281x';

class LED {
	private readonly controller = new Controller({
		'channels': [{
			'count': Number.parseInt(Deno.env.get('LED_COUNT') ?? ''),
			'strip': Deno.env.get('LED_STRIP') as keyof typeof STRIP_TYPES,
			'brightness': Number.parseInt(Deno.env.get('LED_BRIGHTNESS') ?? ''),
		}],
	});

	private state: State = {
		'power': false,
		'brightness': 0,
		'hue': 0,
		'saturation': 0,
		'temperature': 0,
	};

	constructor() {
	}

	get power(): boolean {
		return this.state.power;
	}

	set power({ power }: { power: boolean }) {
		this.state.power = power;
	}

	get brightness(): number {
		return this.state.brightness;
	}

	set brightness({ brightness }: { brightness: number }) {
		this.state.brightness = brightness;
	}

	get hue(): number {
		return this.state.hue;
	}

	set hue({ hue }: { hue: number }) {
		this.state.hue = hue;
	}

	get saturation(): number {
		return this.state.saturation;
	}

	set saturation({ saturation }: { saturation: number }) {
		this.state.saturation = saturation;
	}

	get temperature(): number {
		return this.state.temperature;
	}

	set temperature({ temperature }: { temperature: number }) {
		this.state.temperature = temperature;
	}

	private static convert(hue: number, saturation: number, brightness: number): number {
		const h = hue % 360;
		const s = saturation / 100;
		const v = brightness / 100;

		const chroma = v * s;
		const x = chroma * (1 - Math.abs((h / 60) % 2 - 1));
		const m = v - chroma;

		let r = 0;
		let g = 0;
		let b = 0;

		switch (Math.floor(h / 60)) {
			case 0: [r, g, b] = [chroma, x, 0]; break;
			case 1: [r, g, b] = [x, chroma, 0]; break;
			case 2: [r, g, b] = [0, chroma, x]; break;
			case 3: [r, g, b] = [0, x, chroma]; break;
			case 4: [r, g, b] = [x, 0, chroma]; break;
			case 5: [r, g, b] = [chroma, 0, x]; break;
		}

		return Math.round((r + m) * 255) << 16 | Math.round((g + m) * 255) << 8 | Math.round((b + m) * 255);
	}
}

export default new LED();
