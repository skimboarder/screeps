var structUtil = require('util.structureUtils');
var creepUtil = require('util.creepUtils')

var roleWallBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }else if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }else if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
	            filter: (structure) => {
	                return (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART)
	                    && (structure.progress < structure.progressTotal);
	            }
	        });

            var walls1 = creep.room.find(FIND_STRUCTURES, {
                filter: (wall) => {
                    return (wall.structureType == STRUCTURE_RAMPART || wall.structureType == STRUCTURE_WALL)
                        && (wall.hits < 10000);
                }
            });

            var walls2 = creep.room.find(FIND_STRUCTURES, {
                filter: (wall) => {
                    return (wall.structureType == STRUCTURE_RAMPART || wall.structureType == STRUCTURE_WALL)
                        && (wall.hits < 100000);
                }
            });
            if(targets.length) {
                structUtil.buildStruct(creep, targets);
            } else if(walls1.length) {
                structUtil.repairStruct(creep, walls1);
            } else if(walls2.length) {
                structUtil.repairStruct(creep, walls2);
            }
	    }else {
	       creepUtil.getWorkerEnergy(creep);
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
