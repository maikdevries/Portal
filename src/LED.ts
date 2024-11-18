import type { State } from './types.ts';

class LED {
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
}

export default new LED();
