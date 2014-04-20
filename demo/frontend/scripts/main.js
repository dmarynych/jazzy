var jazzy = require('../../../index');
var SockjsSyncer = require('./SockjsSyncer');
var world = new jazzy.World();
var sockSyncer = new SockjsSyncer(world);

window.world = world;

var game = {
    init: function() {
        world.map.tiles.on('add', game.onAddTile);
        world.map.tiles.on('change', game.onChangeTile);
        world.entities.on('add', game.onAddEntity);
        world.entities.on('change', game.onChangeEntity);
    },
    getMapPos: function(point, size) {
        return {
            x: point.x * size,
            y: point.y * size
        };
    },
    onAddTile: function(tile) {
        var size = 50,
            pos = game.getMapPos(tile.get('pos'), size);

        $('<div></div>')
            .css({
                position: 'absolute',
                zIndex: 10,
                left: pos.x,
                top: pos.y,
                width: size,
                height: size,
                border: '1px solid #eee'
            })
            .attr('data-tile', tile.get('tileName'))
            .attr('data-tile-pos', tile.get('pos').toString())
            .attr('title', tile.get('pos').toString())
            .appendTo($('#map'));
    },
    onChangeTile: function(tile) {
        $('[data-tile-pos='+ tile.get('pos').toString() +']')
            .attr('data-tile', tile.get('tileName'));
    },
    onAddEntity: function(entity) {
        console.log(entity);
        var size = 50,
            pos = game.getMapPos(entity.getHeadPoint(), size);
        $('<div></div>')
            .css({
                position: 'absolute',
                zIndex: 100,
                left: pos.x + 2,
                top: pos.y + 2
            })
            .attr('data-entity', entity.get('name'))
            .attr('data-entity-id', entity.id)
            .appendTo($('#map'));

    },
    onChangeEntity: function(entity) {
        var size = 50;
        $('[data-entity-id='+ entity.id +']')
            .css({
                top: (entity.getHeadPoint().x * size),
                left: (entity.getHeadPoint().y * size)
            })
            .attr('data-direction', entity.get('direction'));
        console.log('cht', entity.toJSON());
    }

};






game.init();






var keyToDirection = {'37':'left','38':'up','39':'right','40':'down'};
function keydown(e) {
    var dir = keyToDirection[e.keyCode];

    if(dir) {
        console.log(dir);
        var message = {
            action: 'changeDir',
            directory: dir
        };
        sockSyncer.sock.send(JSON.stringify(message))
    }
}
document.onkeydown = keydown;