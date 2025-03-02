export interface State {
	power: boolean;
	brightness: number;
	hue: number;
	saturation: number;
	temperature: number;
	effect: Effect | null;
}

export interface Effect {
	speed: number;
	type: keyof typeof EFFECT_TYPES;
}

export const EFFECT_TYPES = {
	RAINBOW: 'RAINBOW',
} as const;

export const PROPERTY = {
	POWER: 'POWER',
	BRIGHTNESS: 'BRIGHTNESS',
	HUE: 'HUE',
	SATURATION: 'SATURATION',
	TEMPERATURE: 'TEMPERATURE',
	EFFECT: 'EFFECT',
} as const;
