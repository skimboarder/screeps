var structureTower = require('structure.tower');

var repairStruct = function(creep, struct) {
    if(creep.repair(struct) == ERR_NOT_IN_RANGE) {
        creep.moveTo(struct);
    }
};

var buildStruct = function(creep, struct) {
    if(creep.build(struct) == ERR_NOT_IN_RANGE) {
        creep.moveTo(struct);
    }
};

var runTowerRole = function(creep) {
    
    var tower = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER && structure.energy > structure.energyCapacity / 2
        }
    });
    for (var t in tower) {
        structureTower.run(tower[t]);
    }
    
};

var fillContainer = function(creep) {
    var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
            if((structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity)) {
                return structure;
            }
                
        }
    });
    if(targets) {
        
        if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets, {reusePath: 15});
        }
    }
};

var fillTower = function(creep, tower) {
    var response = creep.transfer(tower, RESOURCE_ENERGY);
    if(response == ERR_NOT_IN_RANGE) {
        creep.moveTo(tower);
   }
};

var fillSpawns = function(creep, target) {
    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
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
    runTowerRole,
    fillContainer,
    fillTower,
    fillSpawns,
    upgradeCtrl
};
