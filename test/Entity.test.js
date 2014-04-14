var Entity = require('../lib/Entity.js'),
    Point3D = require('../lib/Point3D.js');


var util = require('util'),
    assert = require("assert"),
    expect = require('expect.js');

/*global it, describe*/

describe('Entity', function() {

    it('should be created', function() {
        var entity = new Entity();

        expect(entity).to.be.ok();
        expect(entity).to.be.an(Entity);
    });

    it('should convert given pos to Point3D', function() {
        var entity = new Entity({
            pos: [1,2,3]
        });
        expect(entity.get('pos')).to.be.a(Point3D);
    });

    it('should convert given body to Point3D points', function() {
        var entity = new Entity({
            body: [
                [0,0],
                [1,1]
            ]
        });
        expect(entity.get('body')[0]).to.be.a(Point3D);
        expect(entity.get('body')[1]).to.be.a(Point3D);
    });

    it('should accepts props', function() {
        var entity = new Entity({
            props: ['moving']
        });
        expect(entity.is('moving')).to.be(true);
    });

});