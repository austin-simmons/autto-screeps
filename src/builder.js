let upgrader = require('./upgrader');

// TODO: fix builders. Currently they just spawn and sit there.
let builder = {
    /**
     * @param {Creep} creep
     */
    run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        // if there are available construction sites
        if(creep.memory.working == true) {
            let conSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(conSite != undefined) {
                if(creep.build(conSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(conSite);
                }
            } else {
                upgrader.run(creep);
            }
        }
    }
};

module.exports = builder;