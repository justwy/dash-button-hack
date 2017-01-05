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

var count = 0;
button.addListener(function() {
    hueInterface.toggleLightsWithMaxBright(buttonInfo.groupId, function(err) {
        console.log("button pressed %d times", ++count, err);
    })
});
