var roleRoadBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        var decaying = creep.room.find(FIND_STRUCTURES, {
	            filter: (structure) => {
	                return (structure.structureType == STRUCTURE_ROAD)
	                    && structure.ticksToDecay < 25;
	            }
	        });
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
	            filter: (structure) => {
	                return (structure.structureType == STRUCTURE_ROAD)
	                    && structure.progress < structure.progressTotal;
	            }
	        });
	        if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
	        else if(decaying.length){
	            if(creep.repair(decaying[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(decaying[0]);
                }
	        }

	    }
	    else {
	        var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    if((structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0)) {
                        return structure;
                    }

                        
                }
            });
            if(sources.length){
                if(sources[0].transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
	    }
	}
};

module.exports = roleRoadBuilder;