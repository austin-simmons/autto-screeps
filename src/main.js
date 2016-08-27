require('./spawner')();
let values = require('./values');
let harvester = require('./harvester');
let upgrader = require('./upgrader');
let builder = require('./builder');
let repairer = require('./repairer');
let wallRepairer = require('./wallRepairer');

module.exports.loop = function() {
    // cleanup memory object of dead creeps
    for(let name in Memory.creeps) {
        if(Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    // main actions for creeps
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {
            harvester.run(creep);
        } else if(creep.memory.role == 'upgrader') {
            upgrader.run(creep);
        } else if(creep.memory.role == 'builder') {
            builder.run(creep);
        } else if(creep.memory.role == 'repairer') {
            repairer.run(creep);
        } else if(creep.memory.role == 'wallRepairer') {
            wallRepairer.run(creep);
        }
    }

    let numHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    let numUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    let numBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    let numRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    let numWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer');
    let energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
    let name;

    // check if we need to spawn more creeps
    if(numHarvesters <= values.minHarvesters) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');

        if(name == ERR_NOT_ENOUGH_ENERGY && numHarvesters == 0) {
            name = Game.spawns.Spawn1.createCustomCreep(
                Game.spawns.Spawn1.room.energyAvailable,
                'harvester'
            );
        }
    } else if(numUpgraders <= values.minUpgraders) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
    } else if(numBuilders <= values.minBuilders) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    } else if(numRepairers <= values.minRepairers) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
    } else if(numWallRepairers <= values.minWallRepairers) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'wallRepairer');
    }

    // need to change SIMULATIONROOM to actual room name
    let towers = Game.rooms.E24S52.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    let hostiles = Game.rooms.E24S52.find(FIND_HOSTILE_CREEPS);

    towers.forEach(tower => tower.attack(hostiles[0]));

    if(!(name < 0)) {
        console.log(`Spawning creep: ${name}`);
    }
}
