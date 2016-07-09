var CREEP_EXTENSIONBUILDER = [WORK,WORK,WORK,CARRY,MOVE,MOVE];
var CREEP_FARHARVESTER = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
var CREEP_HARVESTER = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE];
var CREEP_ROADBUILDER = [WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK];
var CREEP_TOWERBUILDER = [WORK,WORK,WORK,CARRY,MOVE,MOVE];
var CREEP_TRANSFERSPAWN = [WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE, MOVE];
var CREEP_UPGRADER = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
var CREEP_WALLBUILDER = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,ATTACK,ATTACK,ATTACK,TOUGH,TOUGH];

var HARVESTER = "harvester";
var EXTENSION_BUILDER = "extensionBuilder";
var ROAD_BUILDER = "roadBuilder";
var TRANSFER_SPAWN = "transferSpawn";
var UPGRADER = "upgrader";
var WALL_BUILDER = "wallBuilder";
var FAR_HARVESTER = "farHarvester"
var TOWER_BUILDER = "towerBuilder"


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
    
    var sources = creep.room.find(FIND_SOURCES);
    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1]);
    }
    
}

var getWorkerEnergy = function(creep) {
    var sources = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
        if((structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0)) {
            return structure;
        }
                        
        }
    });
    if(sources.length){
        if(sources[0].transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE || sources[0].transfer(creep, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
            creep.moveTo(sources[0]);
        }
    }
};

var spawnCreeps = function() {

    var newCreep;
    
    if(Game.spawns.Spawn1.spawning == null) {
        if(getPopOfRole(HARVESTER) < 3) {
                
            newCreep = Game.spawns.Spawn1.createCreep(
                                                CREEP_HARVESTER,
                                                null,
                                                {role: 'harvester'}
                                                );
            if(_.isString(newCreep)) {
                console.log("New harvester made. NAME: " + newCreep);
            }
            
        } else if(getPopOfRole(FAR_HARVESTER) < 4) {
            
            newCreep = Game.spawns.Spawn1.createCreep(
                                                CREEP_FARHARVESTER,
                                                null,
                                                {role: 'farHarvester'}
                                                );
            if(_.isString(newCreep)) {
                console.log("New wall farHarvester made. NAME: " + newCreep);
            
            }
            
        } else if(getPopOfRole(TRANSFER_SPAWN) < 2) {
            newCreep = Game.spawns.Spawn1.createCreep(
                                                CREEP_TRANSFERSPAWN,
                                                null,
                                                {role: 'transferSpawn'}
                                                );
            if(_.isString(newCreep)) {
                console.log("New wall transferSpawner made. NAME: " + newCreep);
            }
            
        } else if(getPopOfRole(TOWER_BUILDER) < 1) {
            newCreep = Game.spawns.Spawn1.createCreep(
                                                CREEP_TOWERBUILDER,
                                                null,
                                                {role: 'towerBuilder'}
                                                );
            if(_.isString(newCreep)) {
                console.log("New tower builder made. NAME: " + newCreep);
            }
        } else if(getPopOfRole(WALL_BUILDER) < 2) {
            newCreep = Game.spawns.Spawn1.createCreep(
                                                CREEP_WALLBUILDER,
                                                null,
                                                {role: 'wallBuilder'}
                                                );
            if(_.isString(newCreep)) {
                console.log("New wall builder made. NAME: " + newCreep);
            }
        } else if(getPopOfRole(UPGRADER) < 2) {
            newCreep = Game.spawns.Spawn1.createCreep(
                                                CREEP_UPGRADER,
                                                null,
                                                {role: 'upgrader'}
                                                );
            if(_.isString(newCreep)) {
                console.log("New upgrader made. NAME: " + newCreep);
            }
        } else if(getPopOfRole(EXTENSION_BUILDER) < 1) {
            newCreep = Game.spawns.Spawn1.createCreep(
                                                CREEP_EXTENSIONBUILDER,
                                                null,
                                                {role: 'extensionBuilder'}
                                                );
            if(_.isString(newCreep)) {
                console.log("New extension builder made. NAME: " + newCreep);
            }
        } else if(getPopOfRole(ROAD_BUILDER) < 1) {
            newCreep = Game.spawns.Spawn1.createCreep(
                                                CREEP_ROADBUILDER,
                                                null,
                                                {role: 'roadBuilder'}
                                                );
            if(_.isString(newCreep)) {
                console.log("New road builder made. NAME: " + newCreep);
            }
        }
    }

};

module.exports = {
    getPopOfRole,
    getWorkerEnergy,
    spawnCreeps,
    harvestEnergy,
    CREEP_EXTENSIONBUILDER,
    CREEP_FARHARVESTER,
    CREEP_HARVESTER,
    CREEP_ROADBUILDER,
    CREEP_TOWERBUILDER,
    CREEP_TRANSFERSPAWN,
    CREEP_UPGRADER,
    CREEP_WALLBUILDER,
    HARVESTER,
    EXTENSION_BUILDER,
    ROAD_BUILDER,
    TRANSFER_SPAWN,
    UPGRADER,
    WALL_BUILDER,
    FAR_HARVESTER,
    TOWER_BUILDER
};
