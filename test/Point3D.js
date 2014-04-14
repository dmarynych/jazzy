var Point3D = require('../lib/Point3D');

var _ = require('lodash'),
    util = require('util'),
    expect = require('expect.js');

/*global it, describe, beforeEach */


describe('Point3D', function() {
    var point;

    beforeEach(function() {
        point = new Point3D(50, 45, 0);
    });

    it('should be inititalized', function() {
        expect(point).to.be.ok();
        expect(point).to.be.a(Point3D);

        expect(point.x).to.be(50);
        expect(point.y).to.be(45);
        expect(point.z).to.be(0);
    });

    it('should be inititalized with array', function() {
        var p = new Point3D([1,2,3]);
        expect(p).to.be.ok();
        expect(p).to.be.a(Point3D);
        expect(p.x).to.be(1);
        expect(p.y).to.be(2);
        expect(p.z).to.be(3);
    });

    it('should be inititalized with object', function() {
        var p = new Point3D({x: 1, y: 2, z: 3});
        expect(p).to.be.ok();
        expect(p).to.be.a(Point3D);
        expect(p.x).to.be(1);
        expect(p.y).to.be(2);
        expect(p.z).to.be(3);
    });

    it('checks if this point in rectangle', function() {
        expect(point.isInRect(45, 45, 10, 10)).to.be(true);
        expect(point.isInRect(60, 60, 10, 10)).to.be(false);
    });
    it('checks if this point is near', function() {
        expect(point.isNear(new Point3D(51, 45, 1))).to.be(true);
        expect(point.isNear(new Point3D(50, 46, 0))).to.be(true);
        expect(point.isNear(new Point3D(49, 44, 1))).to.be(true);
    });


    it('should return string', function() {
        expect(point.toString()).to.be('50_45_0');
    });
    it('should return array', function() {
        expect(point.toArray()).to.eql([50, 45, 0]);
    });
    it('should return object', function() {
        expect(point.toJSON()).to.eql({x: 50, y: 45, z: 0});
    });

    it('checks equality', function() {
        expect(point.isEqual(new Point3D(50, 45, 0))).to.be(true);
    });

    it('should get z diff', function() {
        expect(point.getZDiff(new Point3D(50, 45, 1))).to.be(1);
    });

    it('should clone point', function() {
        expect(point.clone()).to.eql(new Point3D(50, 45, 0));
    });

    it('clones self with new z', function() {
        expect(point.cloneWithNewZ(100)).to.eql(new Point3D(50, 45, 100));
    });


});