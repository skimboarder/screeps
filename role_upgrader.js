var creepUtils = require('util.creepUtils');
var structUtils = require('util.structureUtils');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.upgrading && creep.carry.energy == 0) {
	        creep.memory.upgrading = false;
        } else if(!creep.memory.upgrading && (creep.carry.energy == creep.carryCapacity)) {
            creep.memory.upgrading = true;
        } else if(creep.memory.upgrading) {
            structUtils.upgradeCtrl(creep);
        } else if(!creep.memory.upgrading && creep.carry.energy < creep.carryCapacity) {
            creepUtils.getWorkerEnergy(creep);
        }
    }
    
};

module.exports = roleUpgrader;
