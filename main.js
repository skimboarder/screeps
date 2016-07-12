var creepUtil = require('util.creepUtils');
var structUtil = require('util.structureUtils');

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleExtBuilder = require('role.extensionBuilder');
var roleRoadBuilder = require('role.roadBuilder');
var roleWallBuilder = require('role.wallBuilder');
var roleTransferSpawn = require('role.transferSpawn');
var roleFarHarvester = require('role.farHarvester');
var roleTowerBuilder = require('role.towerBuilder');

var structureTower = require('structure.tower');

/* TODO:
    * Code refactor
    * ranged Attackers
    * healer?
    
*/


module.exports.loop = function () {

    clearCreepMemory();

    var creep;
    
    for(var name in Game.creeps) {
        creep = Game.creeps[name];
        
        if(creep.memory.role == creepUtil.HARVESTER) {
            roleHarvester.run(creep);
        } else if(creep.memory.role == creepUtil.UPGRADER) {
            roleUpgrader.run(creep);
        } else if(creep.memory.role == creepUtil.EXTENSION_BUILDER) {
            roleExtBuilder.run(creep);
        } else if(creep.memory.role == creepUtil.ROAD_BUILDER) {
            roleRoadBuilder.run(creep);
        } else if(creep.memory.role == creepUtil.WALL_BUILDER) {
            roleWallBuilder.run(creep);
        } else if(creep.memory.role == creepUtil.TRANSFER_SPAWN) {
            roleTransferSpawn.run(creep);
        } else if(creep.memory.role == creepUtil.FAR_HARVESTER) {
            roleFarHarvester.run(creep);
        } else if(creep.memory.role == creepUtil.TOWER_BUILDER) {
            roleTowerBuilder.run(creep);
        }
    }
    
    structUtil.runTowerRole(creep);
    creepUtil.spawnCreeps();

}

function clearCreepMemory() {
    
    for(var c in Memory.creeps){
        if(!Game.creeps[c]) {
            delete Memory.creeps[c];
            console.log("Creep deleted from memory. NAME: " + c);
        }
    }
}
