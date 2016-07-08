var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.upgrading && creep.carry.energy == 0) {
	        creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && (creep.carry.energy == creep.carryCapacity)) {
            creep.memory.upgrading = true;
        }
        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.flags.upgraderDestFlag);
            }
        }
        if(!creep.memory.upgrading && creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store[RESOURCE_ENERGY] > 0
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

module.exports = roleUpgrader;