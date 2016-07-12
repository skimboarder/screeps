var structUtil = require('util.structureUtils');
var creepUtil = require('util.creepUtils')

var roleWallBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var closestHostile = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 1000);
        if(closestHostile) {
            creep.attack(closestHostile[0]);
        }

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }else if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }else if(creep.memory.building) {
	        var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
	            filter: (structure) => {
	                return (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART)
	                    && (structure.progress < structure.progressTotal);
	            }
	        });

            var walls1 = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (wall) => {
                    return (wall.structureType == STRUCTURE_RAMPART || wall.structureType == STRUCTURE_WALL)
                        && (wall.hits < 10000);
                }
            });

            var walls2 = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (wall) => {
                    return (wall.structureType == STRUCTURE_RAMPART || wall.structureType == STRUCTURE_WALL)
                        && (wall.hits < 100000);
                }
            });
            if(targets) {
                structUtil.buildStruct(creep, targets);
            } else if(walls1) {
                structUtil.repairStruct(creep, walls1);
            } else if(walls2) {
                structUtil.repairStruct(creep, walls2);
            }
	    }else {
	       creepUtil.getWorkerEnergy(creep);
	    }
    }
};

module.exports = roleWallBuilder;
