var creepUtils = require('util.creepUtils');
var structUtils = require('util.structureUtils');

var roleExtensionBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    } else if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    } else if(creep.memory.building) {
	        if(creepUtils.shouldRebuild(creep)){
                var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                    filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE)
                        && (structure.progress < structure.progressTotal);
    	            }
    	        });
    	        if(targets) {
                   structUtils.buildStruct(creep, targets);
                } else {
                    structUtils.upgradeCtrl(creep);
                }
	        } else {
	            var repairs = creep.pos.findClosestByRange(FIND_STRUCTURES, {
	                filter: (structure) => {
	                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) 
	                      && structure.hits < (structure.hitsMax / 2);
	                    }
	                });
                if(repairs) {
                    structUtils.repairStruct(creep, repairs);
                } else {
                    structUtils.upgradeCtrl(creep);
                }
	        }
	    } else {
            creepUtils.getWorkerEnergy(creep);
        }
    }
   
};

module.exports = roleExtensionBuilder;
