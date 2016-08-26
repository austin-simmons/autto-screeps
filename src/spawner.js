module.exports = () => {
    /**
     * @param {Number} energy
     * @param {String} roleName
     */
    StructureSpawn.prototype.createCustomCreep = (energy, roleName) => {
        let numberOfParts = Math.floor(energy / 200);
        let body = [];
        for (let i = 0; i < numberOfParts; i++) {
            body.push(WORK);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(MOVE);
        }

        return this.createCreep(body, undefined, { role: roleName, working: false });
    };
};