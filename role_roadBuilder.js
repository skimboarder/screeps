var creepUtils = require('util.creepUtils');
var structUtils = require('util.structureUtils');

var roleRoadBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var closestHostile = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 1000);
        if(closestHostile) {
            creep.attack(closestHostile[0]);
        }

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    } else if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    } else if(creep.memory.building) {
	        if(creepUtils.shouldRebuild(creep)) {
	            var decaying = creep.pos.findClosestByRange(FIND_STRUCTURES, {
	            filter: (structure) => {
	                return (structure.structureType == STRUCTURE_ROAD)
	                    && structure.hits < 5000;
	                }
	            });
	            
                if(decaying) {
	                structUtils.repairStruct(creep, decaying);
	            } else {
	                structUtils.upgradeCtrl(creep);
	            }
	        } else {
	            var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
	            filter: (structure) => {
	                return (structure.structureType == STRUCTURE_ROAD)
	                    && structure.progress < structure.progressTotal;
	                }
	            });
	            _.sortBy(targets, function(t) { return (t.progressTotal - t.progress); });
	            if(targets) {
                    structUtils.buildStruct(creep, targets[0]);
                } else {
	                structUtils.upgradeCtrl(creep);
	            }
	        } 
	    } else {
	        creepUtils.getWorkerEnergy(creep);
	    }
	}
};

module.exports = roleRoadBuilder;
