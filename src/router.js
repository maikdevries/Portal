const Express = require('express');
const router = Express.Router();

const LED = require('./LED.js');

module.exports = router;

router.get('/status', (req, res) => res.send(`${LED.getStatus()}`));

router.get('/on', (req, res) => res.send(`${LED.powerOn()}`));

router.get('/off', (req, res) => res.send(`${LED.powerOff()}`));

router.get('/brightness', (req, res) => res.send(`${LED.getBrightness()}`));

router.get('/brightness/:brightness', (req, res) => res.send(`${LED.setBrightness(Number(req.params.brightness))}`));

router.get('/colour', (req, res) => res.send(`${LED.getColour()}`));

router.get('/colour/:colour', (req, res) => res.send(`${LED.setColour(req.params.colour.padStart(6, '0'))}`));
