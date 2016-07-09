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
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_CONTAINER)
                    && (structure.progress < structure.progressTotal);
	            }
	        });
	        var repairs = creep.room.find(FIND_STRUCTURES, {
	            filter: (structure) => {
	                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_CONTAINER) 
	                  && structure.hits < (structure.hitsMax / 5);
	            }
	        })
            if(targets.length) {
                structUtils.buildStruct(creep, targets);
            } else if(repairs.length) {
                structUtils.repairStruct(creep, repairs);
            }else {
                structUtils.upgradeCtrl(creep);
            }
	    } else {
	        creepUtils.getWorkerEnergy(creep);
	    }
    }
};

module.exports = roleExtensionBuilder;
