var DashButton = require('dash-button');
var hueInterface = require('./hueInterface')

const CHARMIN_DASH_BUTTON_MAC_ADDRESS = 'ac:63:be:9f:df:9c';
const SMART_WATER_DASH_BUTTON_MAC_ADDRESS = '50:f5:da:d2:20:1e';

var charminButton = new DashButton(CHARMIN_DASH_BUTTON_MAC_ADDRESS);
var smartWaterButton = new DashButton(SMART_WATER_DASH_BUTTON_MAC_ADDRESS);

var charminButtonCount = 0;

charminButton.addListener(function() {
    hueInterface.toggleLightsWithMaxBright(hueInterface.GROUPS.BEDROOM_GROUP_ID, function(err) {
        console.log("Charmin button pressed %d times", ++charminButtonCount, err);
    })
});

var smartWaterButtonCount = 0;
smartWaterButton.addListener(function() {
    hueInterface.toggleLightsWithMaxBright(hueInterface.GROUPS.LIVING_GROUP_ID, function(err) {
        console.log("Smart Water button pressed %d times", ++smartWaterButtonCount, err);
    })
});