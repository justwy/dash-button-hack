var DashButton = require('dash-button');
var hueInterface = require('./hueInterface')

const CHARMIN_DASH_BUTTON_MAC_ADDRESS = 'ac:63:be:9f:df:9c';

var charminButton = new DashButton(CHARMIN_DASH_BUTTON_MAC_ADDRESS);

var count = 0;

charminButton.addListener(function() {
    hueInterface.toggleLightsWithMaxBright(hueInterface.GROUPS.BEDROOM_GROUP_ID, function(err) {
        console.log("Charmin button pressed %d times", ++count, err);
    })
});
