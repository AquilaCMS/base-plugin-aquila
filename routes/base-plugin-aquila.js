const ServicePlugin = require('../services/baseServices');
//const {setConfig, getConfig} = require('../../../services/modules');

module.exports = function (app) {
    app
        .post('v2/modules/saveConfig')
        //.post('/v2/base-plugin-aquila/sendBirthdayMails', sendBirthdayMails)
};


//INUTILE
/*async function sendBirthdayMails(req,res,next){
    try{
        console.log('HEY');
    }
    catch(err){
        next(err);
    }
};*/