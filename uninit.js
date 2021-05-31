//const {Shortcodes} = require('../../orm/models');

/**
 * This function is called when the plugin is desactivated or when we delete it
 */
module.exports = async function (resolve, reject) {
    try {
        //await Shortcodes.deleteOne({tag: 'base-plugin'});
        return resolve();
    } catch (error) {
        console.error('base-plugin-aquila : ', error);
        return reject(error);
    }
};
