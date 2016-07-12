var creepUtils = require("util.creepUtils");
var structUtils = require('util.structureUtils');

var roleTransferSpawn = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.filling && creep.carry.energy == 0) {
            creep.memory.filling = false;
	    }else if(!creep.memory.filling && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.filling = true;
	    }else if(creep.memory.filling) {
	        var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets) {
                structUtils.fillSpawns(creep, targets);
            } else {
                structUtils.upgradeCtrl(creep);
            }
	    } else{
            creepUtils.getWorkerEnergy(creep);
        }
    
    }
};

module.exports = roleTransferSpawn;
