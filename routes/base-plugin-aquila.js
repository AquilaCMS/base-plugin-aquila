/* eslint-disable */
const {authentication, adminAuth} = require('../../../middleware/authentication');
const {info}                      = require('../info.json');
const ServicePlugin               = require('../services/baseServices');
/* eslint-enable */

module.exports = function (app) {
    app
        .get(`/${info.name}/:slug`, getFunction)
        .get(`/${info.name}/config`, getConfig)
        .post(`/${info.name}/test`, postFunction)
        .post(`/${info.name}/protectedTest`, authentication, adminAuth, postFunction); // this route is protected
};

function getFunction(req, res) {
    // on return les params du GET
    try {
        return res.json(req.params);
    } catch(err){
        next(err);
    }
}

function postFunction(req, res) {
    // on return le body du POST
    try {
        return res.json(req.body);
    } catch(err){
        next(err);
    }
}

function getConfig(req, res) {
    // on return le body du POST
    try {
        return res.json(ServicePlugin.getPluginInfos());
    } catch(err){
        next(err);
    }
}
