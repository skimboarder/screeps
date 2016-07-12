var REBUILD_INTERVAL = 300;

var HARVESTER = "harvester";
var EXTENSION_BUILDER = "extensionBuilder";
var ROAD_BUILDER = "roadBuilder";
var TRANSFER_SPAWN = "transferSpawn";
var UPGRADER = "upgrader";
var WALL_BUILDER = "wallBuilder";
var FAR_HARVESTER = "farHarvester"
var TOWER_BUILDER = "towerBuilder"

var CREEP_BODIES = new Array();
CREEP_BODIES[HARVESTER] = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
CREEP_BODIES[EXTENSION_BUILDER] =  [WORK,WORK,WORK,CARRY,MOVE,MOVE];
CREEP_BODIES[ROAD_BUILDER] = [WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH];
CREEP_BODIES[TRANSFER_SPAWN] = [WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
CREEP_BODIES[UPGRADER] = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
CREEP_BODIES[WALL_BUILDER] = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH];
CREEP_BODIES[FAR_HARVESTER] = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
CREEP_BODIES[TOWER_BUILDER] = [WORK,WORK,WORK,CARRY,MOVE,MOVE];

var CREEP_MAXPOP = new Array();
CREEP_MAXPOP[HARVESTER] = 1;
CREEP_MAXPOP[EXTENSION_BUILDER] = 1;
CREEP_MAXPOP[ROAD_BUILDER] = 2;
CREEP_MAXPOP[TRANSFER_SPAWN] = 2;
CREEP_MAXPOP[UPGRADER] = 1;
CREEP_MAXPOP[WALL_BUILDER] = 1;
CREEP_MAXPOP[FAR_HARVESTER] = 4;
CREEP_MAXPOP[TOWER_BUILDER] = 1;

var getPopOfRole = function(job) {

    var pop = 0;
    for (var c in Game.creeps) {
        if(Game.creeps[c].memory.role == job) {
            pop++;
        }
    }
    return pop;
};

var harvestEnergy = function(creep) {
    var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
    if(droppedEnergy) {
        if(creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
            creep.moveTo(droppedEnergy);
        }
    } else {
        var sources = creep.pos.findClosestByRange(FIND_SOURCES);
        if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources);
        }
    }
    
}

var getWorkerEnergy = function(creep) {
    var sources = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
        if((structure.structureType == STRUCTURE_STORAGE) || (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0)) {
            return structure;
        }
                        
        }
    });
    if(sources){
        if(sources.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE || sources.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
            creep.moveTo(sources);
        }
    }
};

var shouldRebuild = function(creep) {
    if(creep.memory.rebuildTimer < REBUILD_INTERVAL && creep.memory.shouldRebuild) {
        creep.memory.rebuildTimer++;
        return true;
    } else if(creep.memory.rebuildTimer < REBUILD_INTERVAL && !creep.memory.shouldRebuild) {
        creep.memory.rebuildTimer++;
        return false;
    } else {
        creep.memory.rebuildTimer = 0;
        creep.memory.shouldRebuild = !creep.memory.shouldRebuild;
        return creep.memory.shouldRebuild;
    }
    
}

var spawnCreeps = function() {

    for(var spawn in Game.spawns) {
        if(spawn.spawning == null) {
            for(var role in CREEP_BODIES) {

                if(getPopOfRole(role) < CREEP_MAXPOP[role]) {
                        
                    var newCreep = Game.spawns[spawn].createCreep(
                                        CREEP_BODIES[role],
                                        null,
                                        {role: role,
                                         home: spawn.room
                                        }
                                    );
                    if(_.isString(newCreep)) {
                        console.log("New " + role + " made. NAME: " + newCreep);
                    }
                    
                }
            }
        }
    }

};

module.exports = {
    getPopOfRole,
    getWorkerEnergy,
    spawnCreeps,
    harvestEnergy,
    shouldRebuild,
    CREEP_BODIES,
    CREEP_MAXPOP,
    HARVESTER,
    EXTENSION_BUILDER,
    ROAD_BUILDER,
    TRANSFER_SPAWN,
    UPGRADER,
    WALL_BUILDER,
    FAR_HARVESTER,
    TOWER_BUILDER
};
