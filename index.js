var DashButton = require('dash-button');
var hueInterface = require('./hueInterface')

const buttonAddrMapping = {
    smartWater: {
        addr: "50:f5:da:d2:20:1e",
        groupId: hueInterface.GROUPS.LIVING_GROUP_ID
    },
    charmin: {
        addr: "ac:63:be:9f:df:9c",
        groupId: hueInterface.GROUPS.BEDROOM_GROUP_ID
    }
};

var select = process.argv[2];
console.log(process.argv)
console.log(select)

var buttonInfo = buttonAddrMapping[select];

var button = new DashButton(buttonInfo.addr);

var lastTimePressedInMillis = 0;
var count = 0;
button.addListener(function() {
    var now = (new Date).getTime();
    var duration = now - lastTimePressedInMillis;
    lastTimePressedInMillis = now;

    console.log('duration between signals in millis', duration);

    if (duration < 500) {
        console.log("Ignore the signal because it is duplicate");
        return;
    }

    hueInterface.toggleLightsWithMaxBright(buttonInfo.groupId, function(err) {
	count++;
        if (err) {
            console.log("woops! ", err);
        } else {
            console.log("pressed %d times", count);
        }
    })
});
