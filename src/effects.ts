import { EFFECT_TYPES } from './types.ts';

export default {
	[EFFECT_TYPES.COLOUR_CYCLE]: colourCycle(),
};

function* colourCycle(): Generator<[number, number, number], never, unknown> {
	let h = 0;
	const s = 100;
	const v = 100;

	while (true) yield [h++, s, v];
}
