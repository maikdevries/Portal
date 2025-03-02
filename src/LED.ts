import type { STRIP_TYPES } from '@maikdevries/rpi-ws281x';
import type { Effect, State } from './types.ts';

import Controller from '@maikdevries/rpi-ws281x';
import effects from './effects.ts';

class LED {
	private readonly controller = new Controller({
		'channels': [{
			'count': Number.parseInt(Deno.env.get('LED_COUNT') ?? ''),
			'strip': Deno.env.get('LED_STRIP') as keyof typeof STRIP_TYPES,
		}],
	});

	private interval = NaN;

	private state: State = {
		'power': false,
		'brightness': 0,
		'hue': 0,
		'saturation': 0,
		'temperature': 0,
		'effect': null,
	};

	constructor() {}

	get power(): boolean {
		return this.state.power;
	}

	set power({ power }: { power: boolean }) {
		this.state.power = power;

		// [NOTE] Directly set brightness to preserve current brightness for next power on
		this.controller.first.brightness = this.state.power ? Math.round(this.state.brightness * 2.55) : 0;
	}

	get brightness(): number {
		return this.state.brightness;
	}

	set brightness({ brightness }: { brightness: number }) {
		this.state.brightness = brightness;
		this.controller.first.brightness = Math.round(this.state.brightness * 2.55);
	}

	get hue(): number {
		return this.state.hue;
	}

	set hue({ hue }: { hue: number }) {
		this.state.hue = hue;
		this.controller.first.colour = [LED.convert(this.state.hue, this.state.saturation, 100)];
	}

	get saturation(): number {
		return this.state.saturation;
	}

	set saturation({ saturation }: { saturation: number }) {
		this.state.saturation = saturation;
		this.controller.first.colour = [LED.convert(this.state.hue, this.state.saturation, 100)];
	}

	get temperature(): number {
		return this.state.temperature;
	}

	set temperature({ temperature }: { temperature: number }) {
		this.state.temperature = temperature;
	}

	get effect(): Effect | null {
		return this.state.effect;
	}

	set effect({ effect }: { effect: Effect | null }) {
		this.state.effect = effect;
		self.clearInterval(this.interval);

		if (!this.state.effect) return;
		const generator = effects[this.state.effect.type];

		this.interval = self.setInterval(
			() => this.controller.first.colour = [...generator.next().value.map((x) => LED.convert(...x))],
			this.state.effect.speed,
		);
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
			case 0:
				[r, g, b] = [chroma, x, 0];
				break;
			case 1:
				[r, g, b] = [x, chroma, 0];
				break;
			case 2:
				[r, g, b] = [0, chroma, x];
				break;
			case 3:
				[r, g, b] = [0, x, chroma];
				break;
			case 4:
				[r, g, b] = [x, 0, chroma];
				break;
			case 5:
				[r, g, b] = [chroma, 0, x];
				break;
		}

		return Math.round((r + m) * 255) << 16 | Math.round((g + m) * 255) << 8 | Math.round((b + m) * 255);
	}
}

export default new LED();
