var jazzy = require('../../../index'),
    Mobile = jazzy.entities.Mobile,
    _ = require('lodash');

var Snake = Mobile.extend({
    defaults: {
        name: 'snake',
        direction: 'down',
        speed: 1000, // msec per tile
        hp: 1
    },

    initialize: function() {
        console.log('snake init');
        this.on('tick', this.tick, this);
    },

    tick: function() {
        var movePoint, tile;

        if(this.isNot('moving')) {
            movePoint = this.world.map.getPointInDirection(this.getHeadPoint(), this.get('direction'));

            if(movePoint) {
                console.log('start move', this.get('direction'), movePoint);
                tile = this.world.map.getTile(movePoint.x, movePoint.y);
                // check, if tile exists and is walkable
                if(tile && tile.is('walkable')) {
                    this.moveTo(movePoint);
                }
            }
        }
    },

    /**
     * Point of snake's head
     *
     * @returns {Point3D}
     */
    getHeadPoint: function() {
        var p = this.get('body')[this.get('body').length - 1];
        return p.clone();
    }
});

module.exports = Snake;