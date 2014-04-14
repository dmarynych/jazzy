var Point3D = require('../lib/Point3D'),
    World = require('../lib/World'),
    Entity = require('../lib/Entity');


var _ = require('lodash'),
    expect = require('expect.js');

/*global it, describe*/

describe('World', function() {

    it('should remove entities', function() {
        var world = new World(),
            ent = new Entity({
                _id: 1
            });

        world.addEntity(ent);
        world.removeEntity(ent);

        expect(world.entities).to.have.length(0);
    });

     it('should get entities in point', function() {
        var world = new World(),
            ent = new Entity({
                _id: 1,
                pos: [0, 1]
            }),
            entWithBody = new Entity({
                _id: 2,
                body: [
                    [0, 1],
                    [0, 2]
                ]
            }),
            ents1, ents2;

        world.addEntity(ent);
        world.addEntity(entWithBody);

        ents1 = world.getEntitiesInPoint(new Point3D(0, 1));

        expect(ents1).to.have.length(2);
    });

});