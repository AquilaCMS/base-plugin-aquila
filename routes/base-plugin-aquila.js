const ServicePlugin = require('../services/baseServices');

module.exports = function (app) {
    app
        .get('/v2/nameToIdentifyTheplugin/:slug', getFunction)
        .get('/v2/nameToIdentifyTheplugin/config', getConfig)
        .post('/v2/nameToIdentifyTheplugin/test', postFunction);
};

function getFunction(req, res) {
    // on return les params du GET
    return res.json(req.params);
}

function postFunction(req, res) {
    // on return le body du POST
    return res.json(req.body);
}

function getConfig(req, res) {
    // on return le body du POST
    return res.json(ServicePlugin.getPluginInfos());
}
