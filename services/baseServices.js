const infos                = require('../info.json');
const {getUsers}           = require('../../../services/users');
const {sendMail}           = require('../../../services/mail');
const {getPromo,setPromo}  = require('../../../services/promo');
const { getModule, setModuleConfigById } = require('../../../services/modules');
const { getConfig } = require('../../../services/modules');

const setConfig = async function (newConfig) {
    const {_id} = await getModule({filter: {name: info.name}});
    await setModuleConfigById(_id.toString(), newConfig);
    return getConfig(info.name);
};

async function sendBirthdayMails(req,res,next){
    //function to send birthday coupons to clients and create them accordingly
    try{
        const usersList = await getUsers({limit : 5000000000, structure : '*'});
        const daysBeforeBday = 1;
        const daysPromoAfterBday = 7; 
        const millisInAYear = 1000*3600*24*365.25;
        const millisInADay = 1000*3600*24;
        var bdayCodes = [];

        for (const user of usersList.datas) {
            const dayDiffBday = Math.floor(((Date.parse(user.createdAt) - Date.now())%(millisInAYear))/millisInADay); //number of days between current date and bday
            console.log('Nom : ',user.lastname);
            console.log('Différence de jours : ',dayDiffBday)
            if (dayDiffBday <= daysBeforeBday && dayDiffBday >= -daysPromoAfterBday) { 
                //are we in the promo period?
                console.log('Code promo crée');
                //create coupon
                bdayCodes.push({
                    'limit_total' : 1,
                    'limit_client' : 1,
                    'used' : 0,
                    'client_used' : 0,
                    'code' : 'BIRTHDAY_' + user.lastname //more than lastname later to avoid same coupon names 
                });
                if (dayDiffBday == daysBeforeBday) { 
                    //send the coupon by mail on the first day of the promo
                    console.log('Mail envoyé');
                    await sendMail({
                        subject : 'Salut ' + user.lastname,
                        htmlBody : 'C est ton anniversaire, voilà ton coupon !\n BIRTHDAY_'+user.lastname, 
                        mailTo :  user.email,
                        mailFrom : 'testbirthday@live.fr'});
                }
            }
        }
        const Promo = await getPromo({filter : {name: infos.info.promoNames[0]}});
        await setPromo({codes : []}, Promo._id); //have to do this because setPromo verifies that code is unique before setting it
        await setPromo({codes : bdayCodes}, Promo._id);
    }
    catch(err){
        throw(err);
    }
};

module.exports = {sendBirthdayMails};