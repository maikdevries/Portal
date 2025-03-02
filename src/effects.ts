import { EFFECT_TYPES } from './types.ts';

export default {
	[EFFECT_TYPES.COLOUR_CYCLE]: colourCycle(),
};

function* colourCycle(): Generator<[number, number, number][], never, unknown> {
	let i = 0;
	while (true) yield [[i = (i + 1) % 360, 100, 100]];
}
