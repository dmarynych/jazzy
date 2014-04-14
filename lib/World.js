var _ = require('lodash'),
    async = require('async'),
    Backbone = require('backbone');

var Point3D = require('./Point3D'),
    Entity = require('./Entity'),
    Map = require('./Map');


/**
 * @class World
 *
 * World - это класс, который занимается обработкой "мира", в нашем случае, это игровая сессия.
 *
 * Пример инициализации
 *
 *     @example
 *     new World({
 *          map: []
 *     });
 *
 * @param data {Object} Объект с параметрами мира, все что тут будет, берется из БД. колекшн Worlds.
 *
 * @constructor
 */
var World = Backbone.Model.extend({

    defaults: {
        tickInterval: 1000
    },

    constructor: function(worldData) {
        Backbone.Model.apply(this, arguments);

        this.entities = new Backbone.Collection();
        this.map = new Map();


        if(worldData && worldData.map) {
            this.map.initTiles(worldData.map);
        }


        setTimeout(this.tick.bind(this), this.get('tickInterval'));
    }

});


World.prototype.tick = function() {
    this.entities.each(function(entity) {
        entity.trigger('tick');
    });

    setTimeout(this.tick.bind(this), this.get('tickInterval'));
};

World.prototype.addEntity = function(entity) {
    entity.world = this;
    this.entities.add(entity);
};
World.prototype.removeEntity = function(entity) {
    this.entities.remove(entity);
};

World.prototype.getEntity = function(entityId) {
    return this.entities.get(entityId);
};

/**
 * Получение сущностей, в указанной точке.
 *
 * @param {Point3D} point
 *
 * @returns {Entity}
 */
World.prototype.getEntitiesInPoint = function(point) {
    return this.entities.filter(function(entity) {
        // сущность может занимать несколько точек на карте, в этом случае у нее есть массив body
        var hasBody = !!entity.get('body'),
            isOnPoint = false;

        // если есть body
        if(hasBody) {
            isOnPoint = !!_.find(entity.get('body'), function(bodyPoint) {
                return bodyPoint.isEqual(point);
            });
        }
        else {
            isOnPoint = entity.get('pos').isEqual(point);
        }

        return isOnPoint;
    });
};

module.exports = World;