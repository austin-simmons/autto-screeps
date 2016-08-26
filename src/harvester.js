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
            if(Game.spawns.Spawn1.energy == Game.spawns.Spawn1.energyCapacity) {
                upgrader.run(creep);
            } else if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Spawn1);
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