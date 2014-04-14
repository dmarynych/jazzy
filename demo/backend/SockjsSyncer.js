var SockjsSyncer = function(world) {
    this.connections = [];
    this.world = world;
    this.world.map.tiles.on('add change', this.onTile, this);
    this.world.entities.on('add change', this.onEntity, this);

    this.init();
};

SockjsSyncer.prototype.init = function() {
    var http = require('http');
    var sockjs = require('sockjs');

    var echo = sockjs.createServer();
    echo.on('connection', function(conn) {
        this.connections.push(conn);

        conn.on('data', function(message) {
            var data = JSON.parse(message);

            if(data.action === 'changeDir') {
                this.world.entities.at(0).set('direction', data.directory);
            }
        }.bind(this));

        conn.on('close', function() {
            this.connections.splice(this.connections.indexOf(conn), 1);
        }.bind(this));

        conn.write(this.getWorldData());
    }.bind(this));

    var server = http.createServer();
    echo.installHandlers(server, {prefix:'/echo'});
    server.listen(3001, '0.0.0.0');
};

SockjsSyncer.prototype.getWorldData = function() {
    var message = {
        action: 'init',
        tiles: this.world.map.tiles.toJSON(),
        entities: this.world.entities.toJSON()
    };

    return JSON.stringify(message);
};

SockjsSyncer.prototype.onTile = function(tile) {
    var message = {
        action: 'tile',
        tile: tile.toJSON()
    };
    this.sendAll(JSON.stringify(message));
};

SockjsSyncer.prototype.onEntity = function(entity) {
    var message = {
        action: 'entity',
        entity: entity.toJSON()
    };
    this.sendAll(JSON.stringify(message));
};

SockjsSyncer.prototype.sendAll = function(message) {
    for (var i = 0; i < this.connections.length; i++) {
        this.connections[i].write(message);
    }
};

module.exports = SockjsSyncer;