var structUtils = require('util.structureUtils');
var creepUtils = require('util.creepUtils');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            creepUtils.harvestEnergy(creep);
        }
        else {
            structUtils.fillContainer(creep);
        }
    }
};

module.exports = roleHarvester;
