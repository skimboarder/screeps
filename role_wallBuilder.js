var roleWallBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
	            filter: (structure) => {
	                return (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART)
	                    && (structure.progress < structure.progressTotal);
	            }
	        });

            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                var walls = creep.room.find(FIND_STRUCTURES, {
                    filter: (wall) => {
                        return (wall.structureType == STRUCTURE_RAMPART || wall.structureType == STRUCTURE_WALL)
                            && (wall.hits < 10000);
                    }
                });
                if(walls.length) {
                    if(creep.repair(walls[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(walls[0]);
                    }
                }else { 
                    var walls = creep.room.find(FIND_STRUCTURES, {
                    filter: (wall) => {
                        return (wall.structureType == STRUCTURE_RAMPART || wall.structureType == STRUCTURE_WALL)
                            && (wall.hits < 100000);
                    }
                });
                    
                    if(walls.length) {
                        if(creep.repair(walls[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(walls[0]);
                        }
                    }
                }
	        }
	    }else {
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

function currentMax(creep) {
    var max = 0;
    
    var walls = creep.room.find(FIND_STRUCTURES, {
            filter: (wall) => {
                return (wall.structureType == STRUCTURE_RAMPART || wall.structureType == STRUCTURE_WALL)
                    && wall.hits > 1;
            }
    }); 
    var w = 0;
    if(walls.length){
        while(w < walls.length) {
            if(walls[w].hits > max) {
                max = walls[w].hits;
            }
            w++;
        }
    }

    return max + 500;
}

module.exports = roleWallBuilder;