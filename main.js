var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleExtBuilder = require('role.extensionBuilder');
var roleRoadBuilder = require('role.roadBuilder');
var roleWallBuilder = require('role.wallBuilder');
var roleTransferSpawn = require('role.transferSpawn');
var roleFarHarvester = require('role.farHarvester');

/* TODO:
    * Code refactor
    * wallBuilders build Ramparts, repair walls and ramparts
    * roadBuilders repair roads
    * meleeAttackers
    * ranged Attackers
    * healer?
    
*/


module.exports.loop = function () {

    clearCreepMemory();
    
    var pop = 0;
    
    for(var name in Game.creeps) {
        pop++;
        
        var creep = Game.creeps[name];
        
        if(creep.memory.role == 'harvester') {

            roleHarvester.run(creep);
        } else if(creep.memory.role == 'upgrader') {

            roleUpgrader.run(creep);
        } else if(creep.memory.role == 'extensionBuilder') {

            roleExtBuilder.run(creep);
        } else if(creep.memory.role == 'roadBuilder') {

            roleRoadBuilder.run(creep);
        } else if(creep.memory.role == 'wallBuilder') {

            roleWallBuilder.run(creep);
        } else if(creep.memory.role == 'transferSpawn') {

            roleTransferSpawn.run(creep);
        } else if(creep.memory.role == 'farHarvester') {
            roleFarHarvester.run(creep);
        }
    }

    spawnCreeps();

}

function spawnCreeps() {
    var HARVESTER = "harvester";
var EXTENSION_BUILDER = "extensionBuilder";
var ROAD_BUILDER = "roadBuilder";
var TRANSFER_SPAWN = "transferSpawn";
var UPGRADER = "upgrader";
var WALL_BUILDER = "wallBuilder";
var FAR_HARVESTER = "farHarvester"

        if(getPopOfRole(HARVESTER) < 3) {
            
            var newCreep = Game.spawns.Spawn1.createCreep(
                                                [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE],
                                                null,
                                                {role: 'harvester'}
                                                );
            if(_.isString(newCreep)) {
                console.log("New harvester made. NAME: " + newCreep);
            }
        }
        
        if(getPopOfRole(UPGRADER) < 1) {
            var newCreep = Game.spawns.Spawn1.createCreep(
                                                [WORK,WORK,CARRY,MOVE,MOVE],
                                                null,
                                                {role: 'upgrader'}
                                                );
            if(_.isString(newCreep)) {
                console.log("New upgrader made. NAME: " + newCreep);
            }
        }
        
        if(getPopOfRole(EXTENSION_BUILDER) < 1) {
            var newCreep = Game.spawns.Spawn1.createCreep(
                                                [WORK,WORK,CARRY,MOVE,MOVE],
                                                null,
                                                {role: 'extensionBuilder'}
                                                );
            if(_.isString(newCreep)) {
                console.log("New extension builder made. NAME: " + newCreep);
            }
        }
        
        if(getPopOfRole(ROAD_BUILDER) < 1) {
            var newCreep = Game.spawns.Spawn1.createCreep(
                                                [WORK,CARRY,CARRY,MOVE,MOVE],
                                                null,
                                                {role: 'roadBuilder'}
                                                );
            if(_.isString(newCreep)) {
                console.log("New road builder made. NAME: " + newCreep);
            }
        }
        
        if(getPopOfRole(WALL_BUILDER) < 1) {
            var newCreep = Game.spawns.Spawn1.createCreep(
                                                [WORK,CARRY,CARRY,MOVE,MOVE],
                                                null,
                                                {role: 'wallBuilder'}
                                                );
            if(_.isString(newCreep)) {
                console.log("New wall builder made. NAME: " + newCreep);
            }
        }
        
        if(getPopOfRole(TRANSFER_SPAWN) < 2) {

            var newCreep = Game.spawns.Spawn1.createCreep(
                                                [WORK,WORK,CARRY,CARRY,MOVE],
                                                null,
                                                {role: 'transferSpawn'}
                                                );
            if(_.isString(newCreep)) {
                console.log("New wall transferSpawner made. NAME: " + newCreep);
            }
                                                
        }
        
        if(getPopOfRole(FAR_HARVESTER) < 2) {
            
            var newCreep = Game.spawns.Spawn1.createCreep(
                                                [WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
                                                {role: 'farHarvester'}
                                                );
            if(_.isString(newCreep)) {
                console.log("New wall farHarvester made. NAME: " + newCreep);
            }
        }
    
}


function clearCreepMemory() {
    
    for(var c in Memory.creeps){
        if(!Game.creeps[c]) {
            delete Memory.creeps[c];
            console.log("Creep deleted from memory. NAME: " + c);
        }
    }
}

function getPopOfRole(job) {

    var pop = 0;
    for (var c in Game.creeps) {
        if(Game.creeps[c].memory.role == job) {
            pop++;
        }
    }
    return pop;
}
