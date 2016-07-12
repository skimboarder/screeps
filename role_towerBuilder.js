var creepUtils = require('util.creepUtils');
var structUtils = require('util.structureUtils');


var roleTowerBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    } else if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    } else if(creep.memory.building) {
	        var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
	            filter: (structure) => {
	                return structure.structureType == STRUCTURE_TOWER
	            }
	        });
            if(targets) {
                creepUtils.buildStruct(creep, targets);
            } else {
                var tower = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_TOWER
                    }
                });
                if(tower) {
                    structUtils.fillTower(creep, tower);
                }
            }
	    } else {
	        creepUtils.getWorkerEnergy(creep);
	    }
	}
	
};

module.exports = roleTowerBuilder;
