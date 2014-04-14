var jazzy = require('../../../index'),
    Mobile = jazzy.entities.Mobile,
    _ = require('lodash');

var Snake = Mobile.extend({
    defaults: {
        name: 'snake',
        direction: 'down',
        action: 'idle',
        speed: 1000, // msec per tile
        hp: 1
    },

    initialize: function() {
        console.log('snake init');
        this.on('tick', this.tick, this);
    },

    tick: function() {
        var movePoint, tile;

        if(!this.is('moving')) {
            movePoint = this.world.map.getPointInDirection(this.get('pos'), this.get('direction'));
            console.log('start move', this.get('direction'), movePoint);

            if(movePoint) {
                tile = this.world.map.getTile(movePoint.x, movePoint.y);
                if(tile) {
                    this.moveTo(movePoint);
                }
            }
        }
    }
});

module.exports = Snake;