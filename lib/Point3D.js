var _ = require('lodash');

/**
 * @class Point3D
 *
 * @param x
 * @param y
 * @param z
 * @constructor
 */
var Point3D = function(x, y, z) {
    if(arguments.length === 1) {
        if(_.isArray(x)) {
            this.x = parseInt(x[0]);
            this.y = parseInt(x[1]);
            this.z = parseInt(x[2] || 0);
        }
        else {
            this.x = parseInt(x.x);
            this.y = parseInt(x.y);
            this.z = parseInt(x.z || 0);
        }
    }
    else {
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.z = parseInt(z || 0);
    }
};

/**
 * Checks, if this point, is in bounding rectangle
 *
 * @param x
 * @param y
 * @param width
 * @param height
 *
 * @returns {boolean}
 */
Point3D.prototype.isInRect = function(x, y, width, height) {
    return (this.x >= x && this.x <= (x + width) && this.y >= y && this.y <= (y + height));
};

/**
 * Checks, if this point, is adjacent to given
 *
 * @param point
 * @returns {boolean}
 */
Point3D.prototype.isNear = function(point) {
    return Math.abs(this.x - point.x) <= 1 && Math.abs(this.y - point.y) <= 1 && Math.abs(this.z - point.z) <= 1;
};

/**
 * Checks if points are equal
 * @param point
 * @returns {boolean}
 */
Point3D.prototype.isEqual = function(point) {
    return this.x === point.x && this.y === point.y && this.z === point.z;
};

/**
 * Get the same point, but with given z coordinate
 * @param point
 * @returns {number}
 */
Point3D.prototype.getZDiff = function(point) {
    return point.z - this.z;
};

/**
 * Clones point, with new z coordinate
 * @param z
 * @returns {Point3D}
 */
Point3D.prototype.cloneWithNewZ = function(z) {
    return new Point3D(this.x, this.y, z);
};

/**
 * Clones point
 * @returns {Point3D}
 */
Point3D.prototype.clone = function() {
    return new Point3D(this.x, this.y, this.z);
};

/**
 * Return point as JSON
 * @returns {{x: *, y: *, z: *}}
 */
Point3D.prototype.toJSON = function() {
    return {
        x: this.x,
        y: this.y,
        z: this.z
    };
};

/**
 * Return point as array
 * @returns {*[]}
 */
Point3D.prototype.toArray = function() {
    return [this.x, this.y, this.z];
};

/**
 * Return point as string
 * @returns {string}
 */
Point3D.prototype.toString = function() {
    return this.x + '_' + this.y + '_' + this.z;
};

module.exports = Point3D;