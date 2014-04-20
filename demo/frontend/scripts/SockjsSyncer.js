var Snake = require('../../shared/entities/Snake');

var SockjsSyncer = function(world) {
    this.connections = [];
    this.world = world;
    //this.world.map.tiles.on('add change', this.onTile, this);
    this.world.entities.on('change', this.onEntity, this);

    var sock = new SockJS('http://localhost:3001/echo');
    sock.onopen = function() {
        console.log('open');
    };
    sock.onmessage = function(e) {
        //console.log('message', e.data);

        var data = JSON.parse(e.data);

        if(data.action === 'init') {
            world.map.tiles.add(data.tiles);
            _.each(data.entities, function(entityData) {
                var ent = new Snake(entityData);
                world.addEntity(ent);
            });
        }
        else if(data.action === 'tile') {
            console.log('new tile', data);
            var tile = world.map.tiles.find(function(t) {
                return t.get('pos').isEqual(new jazzy.Point3D(data.tile.pos))
            });
            if(tile) {
                tile.set(data.tile);
            }
            else {
                world.map.tiles.add(data.tile);
            }
        }
        else if(data.action === 'entity') {
            var entity = world.entities.get(data.entity.id);
            if(entity) {
                entity.set(data.entity);
            }
            else {
                var ent = new Snake(data.entity);
                world.addEntity(ent);
            }
        }
    };
    sock.onclose = function() {
        console.log('close');
    };

    this.sock = sock;
};


/*SockjsSyncer.prototype.onEntity = function(entity) {
    var message = {
        action: 'entity',
        entity: entity.toJSON()
    };
    this.sendAll(JSON.stringify(message));
};*/




module.exports = SockjsSyncer;