//ShortCode Extension
//const {Shortcodes} = require('../../orm/models');

const {info, custom}    = require('./info');
const {MailType, Promo}        = require('../../orm/models'); //for mails and promos
const ServiceJob        = require('../../services/job');
const ServicePromo      = require('../../services/promo')

// eslint-disable-next-line no-unused-vars
module.exports = async function (resolve, reject, server, app, passport) {
    try {

        //MAIL
        // get all existing mailTypeCode, and watch if the new one is already existing
        let countMailType = await MailType.estimatedDocumentCount();
        // Creation of the new mail type
        const resultMail   = await MailType.findOne({code: info.mailTypeCode[0]});
        if (!resultMail) {
            await MailType.create({code: info.mailTypeCode[0], name : ' ', translation: {fr: {name: 'Coupon anniversaire'}, en: {name: 'Birthday coupon'}}, position: countMailType});
            countMailType++;
        }

        //CRON
        const cronName = info.cronNames[0]
        const jobExists = await ServiceJob.getModuleJobByName(cronName);
        if (!jobExists) {
            try {
                await ServiceJob.setJob(undefined, cronName, '* * */1 * *', 
                '/modules/base-plugin-aquila/services/baseServices/sendBirthdayMails', 
                {
                    fr: 'Envoie des coupons aux clients pour leur anniversaire',
                    en:'Sends birthday coupons to clients'
                }, 'service', 'system', '', true, '');
            } catch (error) {
                console.error(error);
            }
        } else {
            const mongoose = require('mongoose');
            await mongoose.connection.db.collection('agendaJobs').findOneAndUpdate({ name: cronName }, {
                $set: {
                    'data.comment': {
                        fr: 'Envoie des coupons aux clients pour leur anniversaire',
                        en: 'Sends birthday coupons to clients'
                    }
                }
            });
        }
        
        // PROMO
        const promoName = info.promoNames[0];
        const promoExists = await ServicePromo.getPromo({filter : {name : promoName}});
        if(!promoExists){
            try {
                await ServicePromo.setPromo({name: promoName, dateStart : null, dateEnd : null, discountValue : 20, type : 1, description : 'test',discountType : 'P'});
            }
            catch(err){
                console.error(err);
            };
        }


        //same thing for the mail itself
        //actually no let the user do it
        // const birthdayMail = await Mail.findOne({code : info.mailTypeCode[0]});
        // if (!birthdayMail){ 
        //     await Mail.create({
        //         type        : 'birthdayCoupon',
        //         code        : info.mailTypeCode[0],
        //         from        : 'nexistepas@aquila-cms.com',
        //         translation : {
        //             fr : {
        //                 subject : 'Coupon anniversaire',
        //                 content : 'JOYEUX ANNIVERSAIRE'},
        //             en : {
        //                 subject : 'Coupon anniversaire',
        //                 content : 'JOYEUX ANNIVERSAIRE'},
        //         },
        //         createdAt   : 1,
        //         updatedAt   : 1
        //     });
        // }
         
       

    } catch (error) {
        console.error('Birthday-plugin : ', error);
    };
    try {
        require('./routes/base-plugin-aquila')(app);
        resolve();
    } catch (err) {
        reject(err);
    };
};

/* ShortCode Extension (a mettre dans le 1er try si necessaire)
        const shortCodes = {
            weight      : 100,
            tag         : 'base-plugin',
            translation : {
                fr : {
                    description : 'Description de votre shorcode.',
                    name        : 'Base Module',
                    properties  : [
                        {
                            props       : 'ns-code',
                            description : 'Description de votre propriété',
                            type        : 'text'
                        }
                    ]
                },
                en : {
                    description : 'Description of your shortcode.',
                    name        : 'Base Plugin',
                    properties  : [
                        {
                            props       : 'ns-code',
                            description : 'Desciption of your property',
                            type        : 'text'
                        }
                    ]
                }
            }
        };

        try {
            await Shortcodes.updateOne({tag: shortCodes.tag}, {$set: shortCodes}, {upsert: true});
        } catch (err) {
            console.error('base-plugin-aquila :', err);
        }

        */