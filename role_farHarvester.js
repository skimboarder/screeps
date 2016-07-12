var structUtil = require('util.structureUtils');
var creepUtil = require('util.creepUtils');

var roleFarHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            if(creep.room.name != "E49S42") {
                var exitDir = creep.room.find(FIND_EXIT_RIGHT);
                var exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(exit);

            } else {
                creepUtil.harvestEnergy(creep);
            }

        } else if(creep.carry.energy == creep.carryCapacity) {
            if(creep.room.name == "E49S42") { 
                var exitDir = creep.room.find(FIND_EXIT_LEFT);
                var exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(exit);
            } else {
                structUtil.fillContainer(creep);
            }
        }

    }
};

module.exports = roleFarHarvester;
