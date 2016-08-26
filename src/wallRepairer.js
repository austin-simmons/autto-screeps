let builder = require('./builder');

let wallRepairer = {
    /**
     * @param {Creep} creep
     */
    run: (creep) => {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        let target;

        if(creep.memory.working == true) {
            // find most damaged walls first
            for(let percentage = 0.0001; percentage <= 1; percentage += 0.0001) {
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_WALL &&
                                   s.hits / s.maxHits < percentage
                });

                // break loop if one is found
                if(target != undefined) {
                    break;
                }
            }

            if(target != undefined) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                builder.run(creep);
            }
        } else {
            let source = creep.pos.findClosestByPath(FIND_SOURCES, {
                filter: (s) => s.energy > 0
            });

            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};

module.exports = wallRepairer;