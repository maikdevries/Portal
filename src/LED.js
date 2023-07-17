const LED_MODULE = require('rpi-ws281x-native');
const { CIE_1931 } = require('./constants.js');

const LED_CHANNEL = LED_MODULE(300, {
	dma: 10,
	freq: 800000,
	gpio: 18,
	invert: false,
	brightness: 153,
	stripType: LED_MODULE.stripType.WS2812
});

class LED {
	constructor () {
		this.power = false;
		this.colour = 'FF6A00';
		this.brightness = LED_CHANNEL.brightness;
	}

	getStatus = () => {
		return this.power ? 1 : 0;
	}

	powerOn = () => {
		// NOTE: Avoid double execution when light is already turned on (whenever brightness slider is used)
		if (this.power) return;

		this.power = true;
		this.setBrightness(this.brightness);
		this.setColour(this.colour);

		return this.getStatus();
	}

	powerOff = () => {
		this.power = false;

		// NOTE: Set brightness directly to preserve this.brightness for next power ON
		LED_CHANNEL.brightness = 0;

		this.render();

		return this.getStatus();
	}

	getBrightness = () => {
		return this.power ? this.brightness : 0;
	}

	setBrightness = (brightness) => {
		this.brightness = brightness;
		LED_CHANNEL.brightness = CIE_1931[brightness];

		this.render();

		return this.getBrightness();
	}

	getColour = () => {
		return this.colour;
	}

	setColour = (colour) => {
		this.colour = colour;

		LED_CHANNEL.array.fill(this.#applyColourCorrection(colour));

		this.render();

		return this.getColour();
	}

	#applyColourCorrection = (colour) => {
		// NOTE: Convert from HEX to RGB
		const [r, g, b] = colour.match(/[A-Fa-f\d]{2}/g).map((x) => Number.parseInt(x, 16));

		// NOTE: Apply CIE1931 colour correction through precomputed lookup table
		const [cR, cG, cB] = [CIE_1931[r], CIE_1931[g], CIE_1931[b]];

		// NOTE: Convert corrected RGB back into HEX
		return ((cR & 0xff) << 16) + ((cG & 0xff) << 8) + (cB & 0xff);
	}

	render = () => {
		return LED_MODULE.render();
	}

	terminate = () => {
		LED_MODULE.reset();
		return LED_MODULE.finalize();
	}
}

module.exports = new LED();
