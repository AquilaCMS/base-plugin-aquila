const infos = require('../info.json');

const getPluginInfos = function() {
    return infos.info;
};

module.exports = {getPluginInfos};