var structureTower = {

    /** @param {Creep} creep **/
    run: function(tower) {
    
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
        
        var closestDamagedStructure = tower.pos.findInRange(FIND_STRUCTURES, 2000, {
            filter: (structure) => {
                return (structure.structureType != STRUCTURE_WALL) &&
                    structure.hits < (structure.hitsMax / 2)
            }
        });
        if(closestDamagedStructure) {
            console.log("Structures under 50%: " + closestDamagedStructure.length);
            tower.repair(closestDamagedStructure[_.random(0, closestDamagedStructure.length)]);
        }
    }
};

module.exports = structureTower;
