var creepUtils = require('util.creepUtils');
var structUtils = require('util.structureUtils');

var roleRoadBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    } else if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    } else if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
	            filter: (structure) => {
	                return (structure.structureType == STRUCTURE_ROAD)
	                    && structure.progress < structure.progressTotal;
	            }
	        });
	        if(targets.length) {
                structUtils.buildStruct(creep, targets);
            } else {
                var decaying = creep.room.find(FIND_STRUCTURES, {
	            filter: (structure) => {
	                return (structure.structureType == STRUCTURE_ROAD)
	                    && structure.hits < 5000;
	                }
	            });
                if(decaying.length) {
	                structUtils.repairStruct(creep, decaying);
	            }
	        } 
	    } else {
	        creepUtils.getWorkerEnergy(creep);
	    }
	}
};

module.exports = roleRoadBuilder;
