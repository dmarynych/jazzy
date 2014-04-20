var _ = require('lodash'),
    jazzy = require('./../../index'),
    Snake = require('../shared/entities/Snake'),
    SockjsSyncer = require('./SockjsSyncer');

var worldData = {
    map: [
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass']
    ]
};
// 1. Стартуем генерацию мира
var world = new jazzy.World(worldData);
// 2. Начинаем синхронизацию мира с клиентами
var syncer = new SockjsSyncer(world);

// 3. добавим змейку в мир
world.addEntity(new Snake({
    id: 1,
    body: [[0, 1], [0, 2]]
}));