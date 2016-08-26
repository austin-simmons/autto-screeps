let values = require('./values');
let harvester = require('./harvester');
let upgrader = require('./upgrader');
let builder = require('./builder');
let repairer = require('./repairer');

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
        }
    }

    let numHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    let numUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    let numBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    let numRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    let name;

    // check if we need to spawn more creeps
    if(numHarvesters < values.minHarvesters) {
        name = Game.spawns.Spawn1.createCreep(
            [WORK, WORK, CARRY, MOVE],
            undefined,
            { role: 'harvester', working: false }
        );
    } else if(numUpgraders < values.minUpgraders) {
        name = Game.spawns.Spawn1.createCreep(
            [WORK,WORK,CARRY,MOVE],
            undefined,
            { role: 'upgrader', working: false }
        );
    } else if(numBuilders < values.minBuilders) {
        name = Game.spawns.Spawn1.createCreep(
            [WORK,WORK,CARRY,MOVE],
            undefined,
            { role: 'builder', working: false}
        );
    } else if(numRepairers < values.minRepairers) {
        name = Game.spawns.Spawn1.createCreep(
            [WORK,WORK,CARRY,MOVE],
            undefined,
            { role: repairer, working: false}
        );
    }

    if(!(name < 0)) {
        console.log(`Spawning creep: ${name}`);
    }
}
