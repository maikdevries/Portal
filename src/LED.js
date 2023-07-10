const LED_MODULE = require('rpi-ws281x-native');

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
		LED_CHANNEL.brightness = brightness;

		this.render();

		return this.getBrightness();
	}

	getColour = () => {
		return this.colour;
	}

	setColour = (colour) => {
		this.colour = colour;

		LED_CHANNEL.array.fill(colour);

		this.render();

		return this.getColour();
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
