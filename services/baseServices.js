const {info} = require('../info.json');
const aquilaEvents = require('../../../utils/aquilaEvents');
const { getConfig, setConfig } = require('../../../services/modules');

const getPluginInfos = function() {
    return info;
};


aquilaEvents.on(`changePluginConfig_${info.name}`, (configToCheck) => {
    // this function is an hook, it is used when the config of this plugin is saved/updated
    // here you can verif the config stocked in configToCheck.config
    // https://doc.aquila-cms.com/#/Creating/Plugin/Plugin_Save?id=top
    return configToCheck;
});


module.exports = {
    getPluginInfos
};