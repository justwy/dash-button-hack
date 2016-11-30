var util = require('util');
var request = require('request');

const API_ID = '5G4UWUWbWELYsxryZWK1AN07jQUNoPEEUOYSL4lh';
const HUB_HOST = 'http://192.168.1.18';

const GROUPS = {
    LIVING_GROUP_ID: 1,
    BEDROOM_GROUP_ID: 2
};

const BRIGHTNESS_MAX = 254;
const BRIGHTNESS_MIN = 1;
const BRIGHTNESS_NIGHT = 0.1 * BRIGHTNESS_MAX;

var baseQuery = util.format('%s/api/%s', HUB_HOST, API_ID);

function setLights(groupId, on, brightness, cb) {
    request(
        {
            baseUrl: baseQuery,
            uri: util.format('groups/%d/action', groupId),
            method: 'PUT',
            body: JSON.stringify({
                on: on,
                bri: brightness
            })
        },
        function(err, resp, body) {
            return cb(err);
        }
    );
}

// sample return:
/* {
  "name": "Bedroom", "lights": [ "3" ],
  "type": "Room",
  "state": { "all_on": true, "any_on": true},
  "class": "Bedroom",
  "action": { "on": true, "bri": 254, "alert": "select" }
} */
function getGroupInfo(groupId, cb) {
 request(
     {
         baseUrl: baseQuery,
         uri: util.format('groups/%d', groupId),
         method: 'GET'
     }, function(err, resp, body) {
         if (err) return cb(err);
         return cb(null, JSON.parse(body))
     }
 );
}

function toggleLights(groupId, brightness, cb) {
    getGroupInfo(groupId, function(err, info) {
        if (err) return cb(err);

        var isOn = info.state.any_on;

        var toState = !isOn;
        setLights(groupId, toState, brightness, cb);
    })
}

function toggleLightsWithMaxBright(groupId, cb) {
    return toggleLights(groupId, BRIGHTNESS_MAX, cb);
}

module.exports = {
    toggleLightsWithMaxBright: toggleLightsWithMaxBright,
    GROUPS: GROUPS
}