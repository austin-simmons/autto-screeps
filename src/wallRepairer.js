let builder = require('./builder');

let wallRepairer = {
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

        if (creep.memory.working == true) {
            let walls = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_WALL
            });

            let target = undefined;

            for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){


                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_WALL &&
                                   s.hits / s.hitsMax < percentage
                });

                if (target != undefined) {
                    break;
                }
            }

            if (target != undefined) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                builder.run(creep);
            }
        }
        else {
            let source = creep.pos.findClosestByPath(FIND_SOURCES, {
                filter: (s) => s.energy > 0
            });
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};

module.exports = wallRepairer;