var Backbone = require('backbone');

var Tile = require('./Tile');

var TilesCollection = Backbone.Collection.extend({
    model: Tile,

    getRandomTile: function() {
        return this.at( Math.round(Math.random() * this.length));
    }
});

module.exports = TilesCollection;