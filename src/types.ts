export interface State {
	power: boolean;
	brightness: number;
	hue: number;
	saturation: number;
	temperature: number;
}

export const PROPERTY = {
	POWER: 'POWER',
	BRIGHTNESS: 'BRIGHTNESS',
	HUE: 'HUE',
	SATURATION: 'SATURATION',
	TEMPERATURE: 'TEMPERATURE',
	EFFECT: 'EFFECT',
} as const;
