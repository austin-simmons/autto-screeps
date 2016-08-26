let builder = require('./builder');

let repairer = {
    /**
     * @param {Creep} creep
     */
    run: (creep) => {
        if(creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working == false;
        } else if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working == true;
        }

        if(creep.memory.working == true) {
            // find damaged buidings
            let structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });

            if(structure != undefined) {
                if(creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            } else {
                builder.run(creep);
            }
        } else {
            let source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};

module.exports = repairer;