let upgrader = require('./upgrader');

let harvester = {
    /**
     * @param {Creep} creep
     */
    run: (creep) => {
        // if creep is going back to spawn but has no energy
        if(creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        // if harvesting but energy is full
        else if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        // if creep is supposed to be bringing energy to spawn
        if(creep.memory.working == true) {
            let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                || s.structureType == STRUCTURE_EXTENSION
                                || s.structureType == STRUCTURE_TOWER)
                                && s.energy < s.energyCapacity

            });

            if(structure != undefined) {
                if(creep.transfer(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            } else {
                upgrader.run(creep);
            }
        }
        // if creep is supposed to be harvesting
        else {
            let source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
}

module.exports = harvester;