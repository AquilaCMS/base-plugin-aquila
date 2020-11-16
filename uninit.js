const {Shortcodes} = require('../../orm/models');

/**
 * Cette fonction est appelée lors de la desactivation d'un module et lors de la suppression d'un module
 */
module.exports = async function (resolve, reject) {
    try {
        await Shortcodes.deleteOne({tag: 'base-plugin'});
        return resolve();
    } catch (error) {
        console.error('base-plugin-aquila : ', error);
        return reject(error);
    }
};
