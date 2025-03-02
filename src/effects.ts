export function* rainbow(): Generator<[number, number, number], never, unknown> {
	let h = 0;
	const s = 100;
	const v = 100;

	while (true) yield [h++, s, v];
}
