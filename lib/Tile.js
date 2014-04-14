var _ = require('lodash');

var Entity = require('./Entity');


// временный хак
require('../demo/shared/tiles/grass');
require('../demo/shared/tiles/wall');

/**
 * @class Tile
 * @param pos
 * @param tileName
 *
 * @constructor
 */
var Tile = Entity.extend({
    constructor: function(tileData) {
        var tData = require('../demo/shared/tiles/'+ tileData.tileName );
        tileData = _.extend(tileData, tData);


        Entity.apply(this, [tileData]);
    }
});

module.exports = Tile;