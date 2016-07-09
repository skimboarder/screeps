var repairStruct = function(creep, struct) {
    if(creep.repair(struct[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(struct[0]);
    }
};

var buildStruct = function(creep, struct) {
    if(creep.build(struct[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(struct[0]);
    }
}

var fillContainer = function(creep) {
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            if((structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity)) {
                return structure;
            }
                
        }
    });
    if(targets.length > 0) {
        
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {reusePath: 15});
        }
    }
};

var fillTower = function(creep, tower) {
    var response = creep.transfer(tower[0], RESOURCE_ENERGY);
    if(response == ERR_NOT_IN_RANGE) {
        creep.moveTo(tower[0]);
   }
};

var fillSpawns = function(creep, targets) {
    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);
    }
};

var upgradeCtrl = function(creep) {
    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.flags.upgraderDestFlag);
    }
}

module.exports = {
    repairStruct,
    buildStruct,
    fillContainer,
    fillTower,
    fillSpawns,
    upgradeCtrl
};
