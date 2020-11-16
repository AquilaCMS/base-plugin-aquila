const aquilaEvents = require('../../utils/aquilaEvents');

module.exports = function () {
    aquilaEvents.on('userSchemaInit', (userSchema) => {
        // On ajoute au schema du user l'id galaxia
        userSchema.add({weight: {type: String, default: null}});
    });
};
