var _ = require('lodash'),
    util = require('util'),
    Point3D = require('./Point3D'),
    Tile = require('./Tile'),
    Entity = require('./Entity'),
    TilesCollection = require('./TilesCollection');


/**
 * @class Map
 *
 * @param map
 * @constructor
 */
var Map = function(map) {
    //this.mapRaw = map ? _.cloneDeep(map) : [];
    this.tiles = new TilesCollection();

    if(map) {
        this.initTiles(map);
    }
};

/**
 *
 */
Map.prototype.initTiles = function(map) {
    if(!map) return;

    for(var y = 0; y < map.length; y++) {
        for(var x = 0; x < map[y].length; x++) {
            var tileName = map[y][x],
                pos = new Point3D(x, y, 0),
                tile;

            tile = new Tile({
                tileName: tileName,
                pos: pos
            });

            this.tiles.add(tile);
        }
    }


};

Map.prototype.getPointInDirection = function(point, direction) {
    var directTable = {
            "up": [-1, 0],
            "down": [1, 0],
            "left": [0, -1],
            "right": [0, 1]
        },
        dirDiff = directTable[direction] ? directTable[direction] : directTable['up'];

    return new Point3D(point.x + dirDiff[0], point.y + dirDiff[1], 0);
};

/**
 *
 * @param x
 * @param y
 * @returns {Tile}
 */
Map.prototype.getTile = function(x, y) {
    return this.tiles.find(function(tile) {
        return tile.get('pos').x === x && tile.get('pos').y === y;
    });
};

Map.prototype.getTilesAround = function(tile, dist, checker) {
    dist = dist || 1;
    var pos = tile.get('pos'),
        tiles = [];

    for(var x = pos.x - dist; x <= pos.x + dist; x++) {
        for(var y = pos.y - dist; y <= pos.y + dist; y++) {
            var tile = this.getTile(x, y);

            if(!tile) continue;

            if(!checker || tile.check(checker)) {
                tiles.push(tile);
            }
        }
    }

    return new TilesCollection(tiles);
};

module.exports = Map;