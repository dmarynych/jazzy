var _ = require('lodash'),
    Backbone = require('backbone'),
    Point3D = require('./Point3D');

/**
 * @class Entity
 * @param entityData
 * @constructor
 */
var Entity = Backbone.Model.extend({
    constructor: function(entityData) {
        Backbone.Model.apply(this, arguments);
        entityData = entityData || {};
        // if Entity has position - converting ot to Point3D
        if(entityData.pos && !(entityData.pos instanceof Point3D)) {
            this.set('pos', new Point3D(entityData.pos));
        }

        // Entity may have body. In this case, it is two-dimensional array.
        // Here we converting its coordinates, to Point3D-s
        if(entityData.body && _.isArray(entityData.body)) {
            this.set('body', entityData.body.map(function(coords) {
                return new Point3D(coords);
            }));
        }

        this.props = entityData.props || [];

        this.on('tick', this.entityTick, this);
        this.on('change:pos', function() {
            if(!(this.get('pos') instanceof Point3D)) {
                this.set('pos', new Point3D(this.get('pos')), {silent: true});
            }
        }, this);
        this.on('change:body', function() {
            _.each(this.get('body'), function(pos, k) {
                if(!(pos instanceof Point3D)) {
                    var body = this.get('body');
                    body[k] = new Point3D(pos);

                    this.set('body', body, {silent: true});
                }
            }, this);

        }, this);
    }
});

Entity.prototype.entityTick = function() {
    this.checkMovement();
};

/**
 * Move Entity to point
 *
 * @param {Point3D} point
 */
Entity.prototype.moveTo = function(point) {
    var moveTime = this.get('speed');

    this.addProp('moving');
    this.set({
        movePoint: point,
        // время, когда движение окончится
        moveEndTime: new Date().getTime() + moveTime
    });
};

/**
 * Check, if Entity movement is ended.
 *
 */
Entity.prototype.checkMovement = function() {
    if(this.is('moving') && this.get('moveEndTime') <= new Date().getTime()) {
        this.endMovement();
    }
};

/**
 * End Entity's movement.
 *
 */
Entity.prototype.endMovement = function() {
    console.log('move end');
    this.removeProp('moving');

    this.set('pos', this.get('movePoint'));
};

/**
 * Check Entity with custom function.
 *
 * @param {Function} fn
 * @returns {boolean}
 */
Entity.prototype.check = function(fn) {
    return fn.call(this, this);
};

/**
 * Check if Entity has given property.
 *
 * @param {String} prop
 * @returns {boolean}
 */
Entity.prototype.is = Entity.prototype.hasProp = function(prop) {
    return _.indexOf(this.props, prop) !== -1;
};

/**
 * Check if Entity does not have given property.
 *
 * @param {String} prop
 * @returns {boolean}
 */
Entity.prototype.isNot = Entity.prototype.hasProp = function(prop) {
    return !this.is(prop);
};

/**
 * Adding of new Entity property. Something like 'walkable', 'water', 'rock'
 * and any other, whatever your game needs.
 *
 * @param prop
 */
Entity.prototype.addProp = function(prop) {
    if(!this.hasProp(prop)) {
        this.props.push(prop);
    }
};

/**
 * Removing any of Entity prop.
 *
 * @param prop
 */
Entity.prototype.removeProp = function(prop) {
    if(this.hasProp(prop)) {
        this.props = _.without(this.props, prop);
    }
};


module.exports = Entity;