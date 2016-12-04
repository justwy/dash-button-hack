var DashButton = require('dash-button');
var hueInterface = require('./hueInterface')

const addrButtonMapping = {
    "50:f5:da:d2:20:1e": {
        name: "smartWater",
        groupId: hueInterface.GROUPS.LIVING_GROUP_ID
    },
    "ac:63:be:9f:df:9c": {
        name: "charmin",
        groupId: hueInterface.GROUPS.BEDROOM_GROUP_ID
    }
};

var dashButtonMacAddress = process.env.DASH_BUTTON_ADDR;

var buttonInfo = addrButtonMapping[dashButtonMacAddress];

var button = new DashButton(dashButtonMacAddress);

var count = 0;
button.addListener(function() {
    hueInterface.toggleLightsWithMaxBright(buttonInfo.groupId, function(err) {
        console.log("button pressed %d times", ++count, err);
    })
});
